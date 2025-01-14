import React from 'react';
import { View, Text, StyleSheet, FlatList, StyleProp, TextStyle, ViewStyle, TouchableOpacity } from 'react-native';
import { Item } from '../types/Item';

interface ItemListProps {
    items: Item[];
    onRemoveItem: (itemId: number) => void;
}

interface Styles {
    itemContainer: StyleProp<ViewStyle>;
    itemName: StyleProp<TextStyle>;
    itemDetails: StyleProp<TextStyle>;
    removeButton: StyleProp<TextStyle>;
}

const ItemList: React.FC<ItemListProps> = ({ items, onRemoveItem }) => {
    const [deleteItemId, setDeleteItemId] = React.useState<number | null>(null);

    const handleDeleteButtonPress = async (itemId: number) => {
        setDeleteItemId(itemId);
        await onRemoveItem(itemId);
        setDeleteItemId(null);
    };

    return (
        <View>
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View key={item.id} style={styles.itemContainer}>
                        <Text style={styles.itemName}>>{item.name}</Text>
                        <Text style={styles.itemDetails}>
                            Count: {item.count} | Expires: {item.expirationDate} || 'N/A'
                        </Text>
                        <TouchableOpacity onPress={() => handleDeleteButtonPress(item.id)}>
                            <Text style={styles.removeButton}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles: Styles = StyleSheet.create({
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
    removeButton: {
        color: 'red',
        textAlign: 'right',
    },
});

export default ItemList;