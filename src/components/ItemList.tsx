import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    SectionList, StyleProp, TextStyle
} from 'react-native';
import ListItem from './ListItem'
import ListItemEditor from './ListItemEditor'
import { Item } from '../types/Item';
import Animated from 'react-native-reanimated';
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";

interface ItemListProps {
    items: Item[];
    onRemoveItem: (itemId: number) => void;
    onEditItem: (itemId: number, updatedData: Partial<Item>) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onRemoveItem, onEditItem }) => {
    const [deleteItemId, setDeleteItemId] = React.useState<number | null>(null);
    const scrollRef = React.useRef(null);
    const [isEditorModalVisible, setIsEditorModalVisible] = useState(false);
    const editorModalRef = useRef<BottomSheet | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    useEffect(() => {
        if (isEditorModalVisible && editorModalRef.current) {
            editorModalRef.current.expand();
        } else if (editorModalRef.current) {
            editorModalRef.current.close();
        }
    }, [isEditorModalVisible]);

    const handleEditorModalChanges = (index: number) => {
        if (index === -1) {
            setIsEditorModalVisible(false);
            setSelectedItem(null);
        }
    };

    const handleDelete = async (itemId: number) => {
        setDeleteItemId(itemId);
        await onRemoveItem(itemId);
        setDeleteItemId(null);
    };

    const handleSelectItem = (item: Item) => {
        setSelectedItem(item);
        setIsEditorModalVisible(true);
    };

    const handleEdit = (itemId: number, updatedData: Partial<Item>) => {
        console.log('editing....')
        onEditItem(itemId, updatedData);
        console.log(itemId, updatedData)
        setIsEditorModalVisible(false);
    }

    const getGroupedSections = () => {
        const groupedItems = items.reduce((groups, item) => {
            const category = item.category || "Uncategorized";

            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(item);
            return groups;
        }, {});

        return Object.keys(groupedItems)
            .sort()
            .map(category => ({
                title: category,
                data: groupedItems[category]
            }))
    }

    const sections = getGroupedSections();

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollList}
                scrollRef={scrollRef}
            >
                {
                    sections.map(section => (
                        <View key={section.title}>
                            <View>
                                <Text style={styles.category as StyleProp<TextStyle>}>{section.title.toUpperCase()}</Text>
                            </View>
                            <View>
                                {
                                    section.data.map(item => (
                                        <View key={item.id}>
                                            <ListItem
                                                item={item}
                                                onDelete={handleDelete}
                                                setIsEditorModalVisible={setIsEditorModalVisible}
                                                isEditorModalVisible={true}
                                                onSelectItem={handleSelectItem}
                                            />
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
            <BottomSheet
                ref={editorModalRef}
                onChange={handleEditorModalChanges}
                snapPoints={['35%', '50%']}
                enablePanDownToClose={true}
                index={-1}
            >
                <BottomSheetView>

                    {
                        selectedItem && (
                            <ListItemEditor
                                item={selectedItem}
                                onClose={() => setIsEditorModalVisible(false)}
                                onEdit={handleEdit}
                            />
                        )
                    }
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
    },
    scrollList: {
        flex: 1,
    },
    category: {
        marginHorizontal: 17,
        marginVertical: 8,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default ItemList;