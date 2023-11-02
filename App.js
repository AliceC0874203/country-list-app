import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import DetailsScreen from './DetailsScreen';
import EditAddScreen from './EditAddScreen';

const Stack = createStackNavigator();

const initialData = [
  { id: '1', name: 'USA', flag: '🇺🇸', population: '331 million' },
  { id: '2', name: 'Canada', flag: '🇨🇦', population: '37.6 million' },
  { id: '3', name: 'UK', flag: '🇬🇧', population: '66.6 million' },
  { id: '4', name: 'Germany', flag: '🇩🇪', population: '83.1 million' },
  { id: '5', name: 'France', flag: '🇫🇷', population: '65.3 million' },
];

const ListItem = ({ item, navigation, handleDelete, openSwipeable, setOpenSwipeable }) => {
  const swipeableRef = React.useRef(null);

  const closeSwipeable = () => {
    swipeableRef.current.close();
  };

  const handleSwipeableWillOpen = () => {
    if (openSwipeable && openSwipeable !== swipeableRef) {
      openSwipeable.current.close();
    }
    setOpenSwipeable(swipeableRef);
  };

  const handleEditPress = () => {
    navigation.navigate('EditAdd', item);
    closeSwipeable();
  };

  const handleDeletePress = () => {
    handleDelete(item.id);
    closeSwipeable();
  };

  const renderRightActions = () => (
    <View style={styles.rightActions}>
      <TouchableOpacity
        style={[styles.actionButton, styles.editButton]}
        onPress={handleEditPress}
      >
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={handleDeletePress}
      >
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable 
      ref={swipeableRef} 
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={handleSwipeableWillOpen}
    >
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
          <Text style={styles.listItemText}>{item.flag} {item.name}</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const HomeScreen = ({ route, navigation }) => {
  const [data, setData] = useState(initialData);
  const [openSwipeable, setOpenSwipeable] = useState(null);

  useEffect(() => {
    if (route.params?.itemData) {
      if (route.params?.isEditing) {
        const newData = data.map(item =>
          item.id === route.params.itemData.id ? route.params.itemData : item
        );
        setData(newData);
      } else {
        setData([...data, route.params.itemData]);
      }
    }
  }, [route.params?.itemData]);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => setData(data.filter((item) => item.id !== id)),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <ListItem 
      item={item} 
      navigation={navigation} 
      handleDelete={handleDelete}
      openSwipeable={openSwipeable}
      setOpenSwipeable={setOpenSwipeable}
    />
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('EditAdd')}
        >
          <Text style={styles.addButtonText}>Add Country</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="EditAdd" component={EditAddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    fontSize: 18,
  },
  deleteText: {
    color: 'red',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF', // Blue color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20, // Rounded corners
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  editText: {
    color: 'blue',
    marginRight: 10,
  },
  rightActions: {
    width: 150,
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
  },
  editButton: {
    backgroundColor: 'blue',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
  },
});