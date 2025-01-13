import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Item } from '../types/Item';

interface ItemListProps {
    items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
    return (
        <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View key={item.id} style={styles.itemContainer}>
                    <Text style={styles.itemName as any}>>{item.name}</Text>
                    <Text style={styles.itemDetails as any}>
                        Count: {item.count} | Expires: {item.expirationDate} || 'N/A'
                    </Text>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDetails: {
        fontSize: 14,
        color: '#666',
    },
});

export default ItemList;