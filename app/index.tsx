import React from 'react';
import {View, StyleSheet} from 'react-native';
import ItemsScreen from '../src/screens/ItemsScreen';

export default function Home() {
    return (
        <View style={styles.container}>
            <ItemsScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});