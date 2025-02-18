import React from 'react';
import {Image, Text, StyleSheet, StyleProp, TextStyle, ViewStyle, Dimensions, ImageStyle} from 'react-native';
import { Item } from '../types/Item';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import {DefaultStyle} from "react-native-reanimated/lib/typescript/hook/commonTypes";

interface ListItemProps {
    item: Item,
    onDelete: (itemId: number) => void;
}

interface Styles {
    itemContainer: StyleProp<ViewStyle>;
    item: StyleProp<ViewStyle>;
    itemName: StyleProp<TextStyle>;
    itemDetails: StyleProp<TextStyle>;
    detail: StyleProp<TextStyle>;
    deleteButton: StyleProp<ViewStyle>;
    icon: StyleProp<ImageStyle>;
};

const WIDTH_SCREEN = Dimensions.get('window').width;
const ITEM_HEIGHT = 75;
const SWIPE_THRESHOLD = -WIDTH_SCREEN * 0.3;

const ListItem: React.FC<ListItemProps> = ({ item, onDelete }) => {
    const translateX = useSharedValue(0);

    const swipeGesture = Gesture.Pan()
        .activeOffsetX([-15, 15])
        .failOffsetY([-10, 10])
        .onChange((event) => {
            if (event.translationX < 0) {
                translateX.value = event.translationX;
            }
        })
        .onFinalize((event) => {
            const shouldDelete = translateX.value < SWIPE_THRESHOLD;

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

    const transformStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }] as DefaultStyle['transform'],
    }))

    return (
        <Animated.View style={styles.itemContainer}>
            <Animated.View style={styles.deleteButton}>
                <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/11540/11540197.png'}} style={styles.icon}/>
            </Animated.View>
            <GestureDetector gesture={swipeGesture}>
                <Animated.View key={item.id} style={[styles.item, transformStyle]}>
                    <Text style={styles.itemName}>{item.name}</Text>
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    );
};

const styles: Styles = StyleSheet.create({
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
        fontSize: 14,
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
    icon: {
        width: 30,
        height: 35,
    },
});

export default ListItem;