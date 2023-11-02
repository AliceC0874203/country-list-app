// DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
    const { name, flag, population } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{flag} {name}</Text>
            <Text style={styles.text}>Population: {population}</Text>
            {/* Add more details here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
    },
});

export default DetailsScreen;
