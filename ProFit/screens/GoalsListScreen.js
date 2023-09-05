import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Pressable } from 'react-native';

const GoalsListScreen = ({ navigation }) => {
  const [goals, setGoals] = useState([]);

  // Fetch goals from your API when the component mounts
  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await fetch('YOUR_API_ENDPOINT_HERE');
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

    fetchGoals();
  }, []);

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
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.goalItem}>
              {/* Display goal details here */}
              <Text style={styles.goalText}>Plan Name: {item.planName}</Text>
              <Text style={styles.goalText}>Goal: {item.selectedGoal}</Text>
              <Text style={styles.goalText}>Duration: {item.duration} weeks</Text>
              <Text style={styles.goalText}>Description: {item.description}</Text>
            </TouchableOpacity>
          )}
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  goalText: {
    fontSize: 16,
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
});

export default GoalsListScreen;
