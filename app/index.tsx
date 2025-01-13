import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ItemsScreen from '../src/screens/ItemsScreen';

const App = () => {
    return (
        <View style={styles.container}>
            <ItemsScreen />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})