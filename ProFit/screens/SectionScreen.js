import React from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";

const SectionScreen = ({ navigation }) => {
  const handleSelectOption = (option) => {
    if (option === "exercise") {
      navigation.navigate("Home");
    } else if (option === "nutrition") {
      navigation.navigate("Nutrition");
    } else if (option === "diet") {
      navigation.navigate("Diet");
    } else if (option === "goal") {
      navigation.navigate("GoalList");
    }else if (option === "activity") {
      navigation.navigate("Activity");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo2.png')}
          style={styles.logo}
        />
        {/* <Text style={styles.title}>ProFit</Text> */}
      </View>
      <View style={styles.cardContainer}>
        <Pressable onPress={() => handleSelectOption("exercise")} style={styles.card}>
          <View style={styles.cardContent}>
          <Text style={styles.cardText}>Workout</Text>
            <Image source={require("../assets/exercisenew.jpg")} style={styles.image} />
            </View>
        </Pressable>
        <Pressable onPress={() => handleSelectOption("nutrition")} style={styles.card}>
          <View style={styles.cardContent}>
          <Text style={styles.cardText}>Nutrition</Text>
            <Image source={require("../assets/nutrition.jpg")} style={styles.image} />
            </View>
        </Pressable>
        <Pressable onPress={() => handleSelectOption("diet")} style={styles.card}>
          <View style={styles.cardContent}>
          <Text style={styles.cardText}>Diet Plans</Text>
            <Image source={require("../assets/14-days-.jpg")} style={styles.image} />
            </View>
        </Pressable>
        <Pressable onPress={() => handleSelectOption("goal")} style={styles.card}>
    <View style={styles.cardContent}>
    <Text style={styles.cardText}>Set Goals</Text>
      <Image source={require("../assets/goals.jpg")} style={styles.image} />
      </View>
  </Pressable>
  <Pressable onPress={() => handleSelectOption("activity")} style={styles.card}>
    <View style={styles.cardContent}>
    <Text style={styles.cardText}>Activity Log</Text>
      <Image source={require("../assets/logo-200.png")} style={styles.image} />
      </View>
  </Pressable>
  
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center", // Center horizontally
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 300,
    margin: 10,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 60, // Makes it a rounded image
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 20,
  },
});


export default SectionScreen;
