import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';
import ItemList from '../components/ItemList';
import AddItemModal from '../components/AddItemModal';
import { CreateItemDTO, Item } from '../types/Item';
import { addItem, deleteItem, fetchItems } from '../services/api';

interface Styles {
    container: StyleProp<ViewStyle>
    addButtonText: StyleProp<TextStyle>
    addButton: StyleProp<ViewStyle>
}

const ItemsScreen: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

    useEffect(() => {
        const loadItems = async () => {
            const data = await fetchItems();
            setItems(data);
        };

        loadItems().catch((error) => {
            console.error('Error fetching items:', error);
        });
    }, []);

    const deleteItemAndUpdateState = async (itemId: number) => {
        await deleteItem(itemId);
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const addItemAndUpdateState = async (newItemData: CreateItemDTO) => {
        const newItem = await addItem(newItemData);
        setItems((prevItems) => [...prevItems, newItem]);
        setIsAddModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => setIsAddModalVisible(true)}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>Add Item</Text>
            </Pressable>
            <ItemList
                items={items}
                onRemoveItem={deleteItemAndUpdateState}
            />
            <AddItemModal
                visible={isAddModalVisible}
                onClose={() => setIsAddModalVisible(false)}
                onSubmit={addItemAndUpdateState}
            />
        </View>
    );
}

const styles: Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    addButton: {
        padding: 16,
        backgroundColor: '#000',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ItemsScreen;