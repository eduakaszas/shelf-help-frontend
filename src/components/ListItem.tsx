import React from 'react';
import {View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle, TouchableOpacity} from 'react-native';
import { Item } from '../types/Item';

interface Styles {
    itemContainer: StyleProp<ViewStyle>;
    itemName: StyleProp<TextStyle>;
    itemDetails: StyleProp<TextStyle>;
    detail: StyleProp<TextStyle>;
}

interface ListItemProps {
    item?: any, // @TODO: Replace 'any' with the correct type
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
    return (
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
            {/*<TouchableOpacity onPress={() => handleDeleteButtonPress(item.id)}>*/}
            {/*    <Text style={styles.removeButton}>X</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
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
    removeButton: {
        color: 'red',
        textAlign: 'right',
    },
});

export default ListItem;