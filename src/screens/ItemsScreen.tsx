import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import ItemList from '../components/ItemList';
import AddItemModal from '../components/AddItemModal';
import { CreateItemDTO, Item } from '../types/Item';
import { addItem, deleteItem, fetchItems } from '../services/api';
import {GestureHandlerRootView} from "react-native-gesture-handler";

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
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
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
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ItemsScreen;