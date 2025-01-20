import React from 'react';
import { View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle, Animated } from 'react-native';
import { Item } from '../types/Item';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
    AnimatedStyle
} from 'react-native-reanimated';
import {DefaultStyle} from "react-native-reanimated/lib/typescript/hook/commonTypes";

interface ListItemProps {
    item: Item,
    onDelete: (itemId: number) => void;
}

interface RenderRightActionsProps {
    progress: Animated.AnimatedInterpolation<number>;
    dragX: Animated.AnimatedInterpolation<number>;
};

interface Styles {
    itemContainer: StyleProp<ViewStyle>;
    itemName: StyleProp<TextStyle>;
    itemDetails: StyleProp<TextStyle>;
    detail: StyleProp<TextStyle>;
};

const ListItem: React.FC<ListItemProps> = ({ item, onDelete }) => {
    const renderRightActions = (progress: SharedValue<number>, dragX: SharedValue<number>) => {
        const styleAnimation = useAnimatedStyle(() => {
            return {
                transform: [{ translateX: dragX.value + 50 }],
            } as DefaultStyle; // @TODO: is there a better way to type this?
        });

        return (
            <Reanimated.View style={styleAnimation}>
                <Text>Delete</Text>
            </Reanimated.View>
        );
    };

    return (
        <GestureHandlerRootView>
            <ReanimatedSwipeable
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={renderRightActions}
                onSwipeableOpen={() => onDelete(item.id)}
            >
                <View key={item.id} style={styles.itemContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.itemDetails}>
                        <Text style={styles.detail}>
                            Count: {item.count}
                        </Text>
                        <Text style={styles.detail}>
                            Expires: {item.expirationDate}
                        </Text>
                    </View>
                </View>
            </ReanimatedSwipeable>
        </GestureHandlerRootView>
    );
};

const styles: Styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#414141',
        marginBottom: 10,
        borderRadius: 15,
    },
    itemName: {
        fontSize: 18,
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
});

export default ListItem;