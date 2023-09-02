import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import workoutAndDietPlans from '../data/diet'; // Import the data

const DietScreen = () => {
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(0);

  const handleWorkoutPlanChange = (value) => {
    setSelectedWorkoutPlan(value);
  };

  const dietPlan = workoutAndDietPlans[selectedWorkoutPlan];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Workout Plan</Text>
      <Picker
        selectedValue={selectedWorkoutPlan}
        onValueChange={handleWorkoutPlanChange}
        style={styles.picker}
      >
        {workoutAndDietPlans.map((plan, index) => (
          <Picker.Item key={index} label={plan.workoutPlan} value={index} />
        ))}
      </Picker>

      {dietPlan && (
        <View style={styles.dietPlanCard}>
          <Text style={styles.cardHeading}>{dietPlan.workoutPlan}</Text>
          <Text style={styles.cardDetails}>{`Details: ${dietPlan.minimalDetails}`}</Text>
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.buttonText}>Show More</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  dietPlanCard: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardDetails: {
    color: '#666',
  },
  showMoreButton: {
    marginTop: 16,
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DietScreen;
