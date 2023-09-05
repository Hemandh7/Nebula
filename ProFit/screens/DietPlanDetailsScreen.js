import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import workoutAndDietPlans from '../data/diet'; // Import the data

const DietPlanDetailsScreen = ({ route }) => {
  const { dietPlanName } = route.params; // Get the selected diet plan name

  // Access the diet plan details based on the selected name
  const selectedWorkoutPlan = 0; // Set to the appropriate workout plan index
  const dietPlanDetails = workoutAndDietPlans[selectedWorkoutPlan].dietPlans[dietPlanName];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{dietPlanName} Details</Text>
      {Object.entries(dietPlanDetails).map(([meal, foods], index) => (
        <View key={index} style={styles.mealContainer}>
          <Text style={styles.mealHeading}>{meal}</Text>
          {foods.map((food, foodIndex) => (
            <Text key={foodIndex} style={styles.foodItem}>
              {`${foodIndex + 1}. ${food}`}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  mealContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    backgroundColor: 'white',
  },
  mealHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  foodItem: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
});

export default DietPlanDetailsScreen;
