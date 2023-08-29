import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import styles from "./stylesheet";

const UserProfileScreen = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

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
      <Pressable
        title="Save"
        style={styles.button}
        onPress={() => console.log("Save profile")}
      >
        <Text style={styles.buttontext}>Save</Text>
      </Pressable>
    </View>
  );
};

export default UserProfileScreen;
