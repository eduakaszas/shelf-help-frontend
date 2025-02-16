import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import ListItem from './ListItem'
import { Item } from '../types/Item';

interface ItemListProps {
    items: Item[];
    onRemoveItem: (itemId: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onRemoveItem }) => {
    const [deleteItemId, setDeleteItemId] = React.useState<number | null>(null);
    const scrollRef = React.useRef(null);

    const handleDelete = async (itemId: number) => {
        setDeleteItemId(itemId);
        await onRemoveItem(itemId);
        setDeleteItemId(null);
    };

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                ref={scrollRef}
                style={styles.scrollList}
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View key={item.id}>
                        <ListItem item={item} onDelete={handleDelete}/>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollList: {
        flex: 1,
    }
});

export default ItemList;