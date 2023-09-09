import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FitnessItems } from "../Context";
import FitnessCards from "../components/FitnessCards";

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
  const [loggedUID, setLoggedUID] = useState(null); // State to hold the logged UID

  // Fetch logged UID from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchLoggedUID = async () => {
      try {
        const uid = await AsyncStorage.getItem("loggedUID");
        if (uid !== null) {
          setLoggedUID(uid);
        }
      } catch (error) {
        console.error("Error fetching logged UID:", error);
      }
    };

    fetchLoggedUID();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleSaveProgress = () => {
    setIsSaving(true);

    const dataToSave = {
      loggedUID, // Include the logged UID
      workout,
      calories,
      minutes,
      completed,
    };

    axios
      .post("https://fitgym-backend.onrender.com/activity/create/ ", dataToSave)
      .then((response) => {
        console.log("Progress saved successfully:", response.data);
        setIsSaving(false);

        // Reset the context values to 0 after saving
        setWorkout(0);
        setCalories(0);
        setMinutes(0);
        setCompleted([]);
      })
      .catch((error) => {
        console.error("Error saving progress:", error);
        setIsSaving(false);
        Alert.alert("Error", "Failed to save progress.");
      });
      console.log(dataToSave)
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop:50}}>
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
        <ScrollView>   
        <FitnessCards />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
