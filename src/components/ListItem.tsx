import React from 'react';
import {Image, Text, StyleSheet, StyleProp, TextStyle, ViewStyle, Dimensions, ImageStyle} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import {DefaultStyle} from "react-native-reanimated/lib/typescript/hook/commonTypes";
import { Item } from '../types/Item';

interface ListItemProps {
    item: Item,
    onDelete: (itemId: number) => void;
    setIsEditorModalVisible: (visible: boolean) => void;
    isEditorModalVisible: boolean;
    onSelectItem: (item: Item) => void;
}

const WIDTH_SCREEN = Dimensions.get('window').width;
const ITEM_HEIGHT = 75;
const DELETE_SWIPE_THRESHOLD = -WIDTH_SCREEN * 0.3;
const EDIT_SWIPE_THRESHOLD = WIDTH_SCREEN * 0.3;

const ListItem: React.FC<ListItemProps> = ({ item, onDelete, setIsEditorModalVisible, onSelectItem }) => {
    const translateX = useSharedValue(0);

    const handleOpenModal = () => {
        onSelectItem(item);
    }

    const swipeGesture = Gesture.Pan()
        .activeOffsetX([-15, 15])
        .failOffsetY([-10, 10])
        .onChange((event) => {
            if (event.translationX < 0) {
                translateX.value = event.translationX;
            }
        })
        .onFinalize((event) => {
            const shouldDelete = translateX.value < DELETE_SWIPE_THRESHOLD;

            if (shouldDelete) {
                translateX.value = withTiming(-WIDTH_SCREEN, undefined, (isDone) => {
                    if (isDone) {
                        runOnJS(onDelete)(item.id);
                    }
                })
            } else {
                translateX.value = withSpring(0);
            }
        })

    const tapGesture = Gesture.Tap()
        .onEnd(() => {
            runOnJS(handleOpenModal)();
    })

    const combinedGestures = Gesture.Exclusive(swipeGesture, tapGesture);

    const transformStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }] as DefaultStyle['transform'],
    }))

    return (
        <Animated.View style={styles.itemContainer}>
            <Animated.View style={styles.deleteButton}>
                <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/11540/11540197.png'}} style={styles.icon}/>
            </Animated.View>
            <Animated.View style={styles.editButton}>
                <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/2356/2356780.png'}} style={styles.icon}/>
            </Animated.View>
            <GestureDetector gesture={combinedGestures}>
                <Animated.View key={item.id} style={[styles.item, transformStyle]}>
                    <Text style={styles.itemName as StyleProp<TextStyle>}>{item.name}</Text>
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        alignItems: 'center',
    },
    item: {
        width: '90%',
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        backgroundColor: '#414141',
        paddingLeft: 10,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },
    itemName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff',
    },
    itemDetails: {
        flexDirection: 'column',
    },
    detail: {
        fontSize: 14,
        color: '#666',
    },
    deleteButton: {
        height: 70,
        width: 70,
        position: 'absolute',
        right: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        height: 70,
        width: 70,
        position: 'absolute',
        left: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 35,
        height: 35,
    },
});

export default ListItem;