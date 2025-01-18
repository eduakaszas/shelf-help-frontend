import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ItemsScreen from '../src/screens/ItemsScreen';

export default function Home() {
    return (
        <View style={styles.container}>
            <ItemsScreen />
            {/*<Text>WTF</Text>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});