import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ItemList from '../components/ItemList';
import { Item } from '../types/Item';
import {deleteItem, fetchItems} from '../services/api';

const ItemsScreen: React.FC = () => {
    const [items, setItems] = React.useState<Item[]>([]);

    useEffect(() => {
        const loadItems = async () => {
            const data = await fetchItems();
            setItems(data);
        };

        loadItems().catch((error) => {
            console.error('Error fetching items:', error);
        });
    }, []);

    const handleRemoveItem = async (itemId: number) => {
        await deleteItem(itemId);
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    return (
        <View style={styles.container}>
            <ItemList
                items={items}
                onRemoveItem={handleRemoveItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
});

export default ItemsScreen;