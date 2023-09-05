import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image,ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import workoutAndDietPlans from '../data/diet'; // Import the data

const DietScreen = () => {
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(0);
  const navigation = useNavigation(); // Initialize navigation

  const handleWorkoutPlanChange = (value) => {
    setSelectedWorkoutPlan(value);
  };

  const dietPlans = workoutAndDietPlans[selectedWorkoutPlan].dietPlans;

  const handleSeeMorePress = (dietPlanName) => {
    // Navigate to DietPlanDetailsScreen with the selected diet plan name
    navigation.navigate('DietDetails', { dietPlanName });
  };

  return (
    <ScrollView style={styles.container}>
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

      {dietPlans && Object.keys(dietPlans).map((dietPlanName, index) => (
        <View key={index} style={styles.dietPlanCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeading}>{dietPlanName}</Text>
            <Image
              style={styles.logoImage}
              source={{ uri: 'https://www.family.abbott/content/dam/an/familyabbott/my-en/pediasure/tools-and-resources/resources/others/meal-plan/masthead.png' }}
            />
          </View>
          <Text style={styles.cardText}>Follow this plan strictly for results</Text>
          <Pressable
            style={styles.showMoreButton}
            onPress={() => handleSeeMorePress(dietPlanName)} // Pass diet plan name
          >
            <Text style={styles.buttonText}>See More</Text>
          </Pressable>
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
    color: '#333',
    textAlign: 'center',
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  dietPlanCard: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 20, // Makes it a rounded image
  },
  cardText: {
    padding: 16,
    color: '#666',
  },
  showMoreButton: {
    backgroundColor: '#007BFF',
    alignItems: 'center',
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DietScreen;
