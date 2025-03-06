import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import ListItem from './ListItem'
import { Item } from '../types/Item';
import Animated from 'react-native-reanimated';
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";

interface ItemListProps {
    items: Item[];
    onRemoveItem: (itemId: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onRemoveItem }) => {
    const [deleteItemId, setDeleteItemId] = React.useState<number | null>(null);
    const scrollRef = React.useRef(null);
    const [isEditorModalVisible, setIsEditorModalVisible] = useState(false);
    const editorModalRef = useRef<BottomSheet | null>(null);

    useEffect(() => {
        if (isEditorModalVisible && editorModalRef.current) {
            editorModalRef.current.expand();
        } else if (editorModalRef.current) {
            editorModalRef.current.close();
        }
    }, [isEditorModalVisible]);

    const handleEditorModalChanges = useCallback((index: number) => {
        console.log('handleEditorModalChanges', index);

        if (index === -1) {
            setIsEditorModalVisible(false);
        }
    }, []);

    const handleDelete = async (itemId: number) => {
        setDeleteItemId(itemId);
        await onRemoveItem(itemId);
        setDeleteItemId(null);
    };

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollList}
                scrollRef={scrollRef}
            >
                {items.map(item => (
                    <View key={item.id}>
                        <ListItem
                            item={item}
                            onDelete={handleDelete}
                            setIsEditorModalVisible={setIsEditorModalVisible}
                            isEditorModalVisible={true}
                        />
                    </View>
                ))}
            </Animated.ScrollView>
            <BottomSheet
                ref={editorModalRef}
                onChange={handleEditorModalChanges}
                snapPoints={['35%', '50%']}
                enablePanDownToClose={true}
                index={-1}
            >
                <BottomSheetView>
                    <Text>Awesome 🎉</Text>
                </BottomSheetView>
            </BottomSheet>
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