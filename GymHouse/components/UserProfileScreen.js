import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import styles from "./stylesheet";


const UserProfileScreen = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("+91");

  const handleSaveProfile = () => {
    const userProfile = {
      name,
      age,
      gender,
      height,
      weight,
      email,
      contact_number: contactNumber, // Match the field name in your schema
    };

    // Here you can perform actions like sending the data to an API or saving it locally
    console.log("User Profile:", userProfile);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
    <TextInput
        style={styles.input}
        placeholder="Height"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
      />
      <Pressable
        style={styles.button}
        onPress={handleSaveProfile}
      >
        <Text style={styles.buttontext}>Save</Text>
      </Pressable>
    </View>
  );
};

export default UserProfileScreen;
