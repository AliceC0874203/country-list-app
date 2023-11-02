// EditAddScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const EditAddScreen = ({ route, navigation }) => {
    const [name, setName] = useState(route.params?.name || '');
    const [flag, setFlag] = useState(route.params?.flag || '');
    const [population, setPopulation] = useState(route.params?.population || '');

    const handleSubmit = () => {
        const itemData = {
            id: route.params?.id || new Date().getTime().toString(),
            name,
            flag,
            population,
        };
        navigation.navigate('Home', { itemData, isEditing: route.params?.id ? true : false });
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Country Name:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter country name"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Flag:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={flag}
                        onChangeText={setFlag}
                        placeholder="Enter flag emoji"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Population:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={population}
                        onChangeText={setPopulation}
                        placeholder="Enter population"
                    />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
    
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',  // Make sure this matches your main content background color
    },
    container: {
        flex: 1,
        padding: 16,
        margin: 16,
        backgroundColor: '#fff',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '600',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditAddScreen;

