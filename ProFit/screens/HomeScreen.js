import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FitnessItems } from "../Context";
import FitnessCards from "../components/FitnessCards";
import fitnessData from "../data/fitness";

const HomeScreen = () => {
  const {
    minutes,
    calories,
    workout,
    completed,
    setMinutes,
    setCalories,
    setWorkout,
    setCompleted,
  } = useContext(FitnessItems);
  const navigation = useNavigation();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProgress = () => {
    setIsSaving(true);

    const dataToSave = {
      workout,
      calories,
      minutes,
      completed,
    };
    console.log(dataToSave);
    axios
      .post("YOUR_SERVER_ENDPOINT_URL", dataToSave)
      .then((response) => {
        console.log("Progress saved successfully:", response.data);
        setIsSaving(false);

        // Reset the context values to 0 after saving
        
      })
      .catch((error) => {
        console.error("Error saving progress:", error);
        setIsSaving(false);
      });
      setWorkout(0);
        setCalories(0);
        setMinutes(0);
        setCompleted([]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 40, left: 40 }}
          name="arrow-back-outline"
          size={28}
          color="black"
        />

        <View
          style={{
            backgroundColor: "red",
            padding: 10,
            minHeight: 150,
            width: "100%",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            ProFit
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 18,
                }}
              >
                {workout}
              </Text>
              <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
                WORKOUTS
              </Text>
            </View>

            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 18,
                }}
              >
                {calories}
              </Text>
              <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
                KCAL
              </Text>
            </View>

            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 18,
                }}
              >
                {minutes}
              </Text>
              <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
                MINS
              </Text>
            </View>
          </View>

          <Pressable
            style={{
              backgroundColor: isSaving ? "gray" : "green",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={handleSaveProgress}
            disabled={isSaving}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {isSaving ? "Saving..." : "Save Progress"}
            </Text>
          </Pressable>
        </View>

        <FitnessCards />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
