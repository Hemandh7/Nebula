import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const GoalScreen = ({ navigation }) => {
  const [planName, setPlanName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('Weight Loss');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleSaveGoal = async () => {
    // Prepare the goal data
    const goalData = {
      planName,
      selectedGoal,
      duration,
      description,
    };
  
    try {
      // Send a POST request to your API
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      });
  
      if (response.ok) {
        // Goal data saved successfully
        // You can also handle the response from the API if needed
        const responseData = await response.json();
        console.log('Goal saved successfully:', responseData);
        
        // After saving the goal, you can navigate back to the SectionScreen or any other screen.
        navigation.goBack();
      } else {
        // Handle API error here
        console.error('Failed to save goal:', response.status);
      }
    } catch (error) {
      console.error('Error saving goal:', error);
    }
    console.log(goalData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create a Workout Plan</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Plan Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPlanName}
          value={planName}
          placeholder="Enter plan name"
        />

        <Text style={styles.label}>Goal:</Text>
        <Picker
          selectedValue={selectedGoal}
          onValueChange={(itemValue) => setSelectedGoal(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Weight Loss" value="Weight Loss" />
          <Picker.Item label="Muscle Gain" value="Muscle Gain" />
          <Picker.Item label="Cardio Fitness" value="Cardio Fitness" />
          {/* Add more goal options here */}
        </Picker>

        <Text style={styles.label}>Duration (weeks):</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDuration}
          value={duration}
          keyboardType="numeric"
          placeholder="Enter duration in weeks"
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.textarea}
          onChangeText={setDescription}
          value={description}
          multiline={true}
          placeholder="Enter description"
        />

        <Button title="Save Goal" onPress={handleSaveGoal} />
      </View>
    </ScrollView>
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
  form: {
    margin: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  textarea: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
});

export default GoalScreen;
