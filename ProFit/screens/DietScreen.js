import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';
import workoutAndDietPlans from '../data/diet';

const DietScreen = () => {
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(0);
  const navigation = useNavigation();

  const handleWorkoutPlanChange = (value) => {
    setSelectedWorkoutPlan(value);
  };

  const dietPlans = workoutAndDietPlans[selectedWorkoutPlan].dietPlans;

  const handleSeeMorePress = (dietPlanName) => {
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
            onPress={() => handleSeeMorePress(dietPlanName)}
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
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  dietPlanCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  cardText: {
    padding: 16,
    color: '#666',
  },
  showMoreButton: {
    backgroundColor: '#007BFF',
    alignItems: 'center',
    padding: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DietScreen;
