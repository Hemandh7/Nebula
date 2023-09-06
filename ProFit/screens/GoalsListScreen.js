import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoalsListScreen = ({ navigation }) => {
  const [goals, setGoals] = useState([]);
  const [loggedUID, setLoggedUID] = useState('');

  // Function to fetch goals from your API
  async function fetchGoals() {
    try {
      const response = await fetch('https://fitgym-backend.onrender.com/all/goal/');
      if (response.ok) {
        const data = await response.json();
        setGoals(data);
      } else {
        console.error('Failed to fetch goals:', response.status);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  }

  // Fetch goals when the component mounts
  useEffect(() => {
    fetchGoals();
  }, []);

  // Reload goals when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchGoals();
    }, [])
  );

  // Retrieve the loggedUID from AsyncStorage when the component mounts
  useEffect(() => {
    AsyncStorage.getItem('loggedUID')
      .then((storedUID) => {
        if (storedUID !== null) {
          setLoggedUID(storedUID);
        }
      })
      .catch((error) => {
        console.error('Error fetching loggedUID from AsyncStorage:', error);
      });
  }, []);

  const handleMarkAsCompleted = async (goalId, isCompleted) => {
    try {
      const response = await fetch('https://fitgym-backend.onrender.com/goal/update/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goalId,
          userId: loggedUID,
        }),
      });

      if (response.ok) {
        // Goal marked as completed successfully
        // You can handle the response from the API if needed
        console.log('Goal marked as completed successfully');
        // Update the local state to reflect the change
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === goalId ? { ...goal, completed: !isCompleted } : goal
          )
        );
        // Show an alert indicating success
        Alert.alert('Success', 'Goal status updated successfully.');
      } else {
        // Handle API error here
        console.error('Failed to mark goal as completed:', response.status);
        // Show an alert indicating failure
        Alert.alert('Error', 'Failed to update goal status.');
      }
    } catch (error) {
      console.error('Error marking goal as completed:', error);
      // Show an alert for any other errors
      Alert.alert('Error', 'An error occurred while updating goal status.');
    }
  };

  const renderGoalItem = ({ item }) => (
    <View style={styles.goalItem}>
      <View style={styles.goalItemContent}>
        <Text style={styles.goalTitle}>{item.name}</Text>
        <Text style={styles.goalText}>Goal: {item.goal}</Text>
        <Text style={styles.goalText}>Duration: {item.duration} weeks</Text>
        <Text style={styles.goalDescription}>{item.description}</Text>
        <Pressable
          style={styles.markAsCompletedButton}
          onPress={() =>
            handleMarkAsCompleted(item.id, item.completed || false)
          }
        >
          <Text style={styles.markAsCompletedButtonText}>
            {item.completed ? 'Completed' : 'Not Completed'}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals List</Text>
      {goals.length === 0 ? (
        <View style={styles.noGoalsContainer}>
          <Text style={styles.noGoalsText}>No goals to show yet.</Text>
        </View>
      ) : (
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGoalItem}
        />
      )}
      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('Goal')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
    color: '#333',
  },
  noGoalsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGoalsText: {
    fontSize: 18,
    color: '#999',
  },
  goalItem: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  goalItemContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  goalText: {
    fontSize: 16,
    color: '#555',
  },
  goalDescription: {
    fontSize: 14,
    color: '#777',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
  markAsCompletedButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  markAsCompletedButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default GoalsListScreen;