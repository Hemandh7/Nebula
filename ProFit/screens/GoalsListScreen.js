import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoalsListScreen = ({ navigation }) => {
  const [goals, setGoals] = useState([]);
  const [loggedUID, setLoggedUID] = useState('');

  // Function to fetch goals from the API
  const fetchGoals = async () => {
    try {
      // Fetch the loggedUID from AsyncStorage
      const storedUID = await AsyncStorage.getItem('loggedUID');
      if (storedUID !== null) {
        setLoggedUID(storedUID);

        // Fetch all goals from the API
        const response = await fetch('https://fitgym-backend.onrender.com/all/goal/');
        if (response.ok) {
          const data = await response.json();
          // Filter goals that match the loggedUID
          const filteredGoals = data.filter((goal) => goal.userId == storedUID);
          setGoals(filteredGoals);
        } else {
          console.error('Failed to fetch goals:', response.status);
        }
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  // Fetch goals when the component mounts
  useEffect(() => {
    fetchGoals();
  }, []);

  // Reload goals when the screen gains focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGoals();
    });
    return unsubscribe;
  }, [navigation]);

  const handleMarkAsCompleted = async (goalId, isCompleted) => {
    // Implement the logic to mark a goal as completed here
    try {
      // Send a request to update the goal's status
      // ...
      // After successfully updating the goal, update the local state
      const updatedGoals = goals.map((goal) =>
        goal.id === goalId ? { ...goal, completed: !isCompleted } : goal
      );
      setGoals(updatedGoals);
      Alert.alert('Success', 'Goal status updated successfully.');
    } catch (error) {
      console.error('Error marking goal as completed:', error);
      Alert.alert('Error', 'Failed to update goal status.');
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