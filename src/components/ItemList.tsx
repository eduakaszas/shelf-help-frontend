import React from 'react';
import { View, Text, StyleSheet, FlatList, StyleProp, TextStyle, ViewStyle, TouchableOpacity } from 'react-native';
import ListItem from './ListItem'
import { Item } from '../types/Item';

interface ItemListProps {
    items: Item[];
    onRemoveItem: (itemId: number) => void;
}

interface Styles {
    container: StyleProp<ViewStyle>;
}

const ItemList: React.FC<ItemListProps> = ({ items, onRemoveItem }) => {
    const [deleteItemId, setDeleteItemId] = React.useState<number | null>(null);

    const handleDelete = async (itemId: number) => {
        setDeleteItemId(itemId);
        await onRemoveItem(itemId);
        setDeleteItemId(null);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ListItem item={item} onDelete={handleDelete}/>
                )}
            />
        </View>
    )
}

const styles: Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ItemList;