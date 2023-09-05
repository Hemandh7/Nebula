import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import axios from "axios"; // Import axios for making HTTP requests

const ActivityLogScreen = () => {
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    // Fetch progress data from the server when the component mounts
    axios
      .get("YOUR_SERVER_FETCH_ENDPOINT_URL")
      .then((response) => {
        // Set the fetched data to the state
        setActivityLog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activity log:", error);
      });
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 40, flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Workout Report</Text>
          {activityLog.map((logItem, index) => (
            <View key={index} style={styles.card}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Date: {logItem.date}
              </Text>
              <Text>Workout: {logItem.workout}</Text>
              <Text>Calories: {logItem.calories}</Text>
              <Text>Minutes: {logItem.minutes}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityLogScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
