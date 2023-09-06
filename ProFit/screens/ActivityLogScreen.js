import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import axios from "axios"; // Import axios for making HTTP requests
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivityLogScreen = () => {
  const [activityLog, setActivityLog] = useState([]);
  const [loggedUID, setLoggedUID] = useState('');

  useEffect(() => {
    // Fetch loggedUID from AsyncStorage
    AsyncStorage.getItem('loggedUID')
      .then((storedUID) => {
        if (storedUID !== null) {
          setLoggedUID(storedUID);
          // Fetch progress data from the server when the component mounts
          return axios.get(`https://fitgym-backend.onrender.com/all/activity?userId=${storedUID}`);
        }
      })
      .then((response) => {
        if (response) {
          const logData = response.data.map((logItem) => ({
            ...logItem,
            completed: JSON.parse(logItem.completed),
          }));
          setActivityLog(logData);
        }
      })
      .catch((error) => {
        console.error("Error fetching activity log:", error);
      });
  }, []);

  console.log(activityLog);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Workout Report</Text>
          {activityLog.map((logItem, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>
                ID: {logItem.id}
              </Text>
              <Text style={styles.cardText}>Workout: {logItem.workout}</Text>
              <Text style={styles.cardText}>Calories: {logItem.calories}</Text>
              <Text style={styles.cardText}>Minutes: {logItem.minutes}</Text>
              {Array.isArray(logItem.completed) && (
                <View style={styles.completedContainer}>
                  <Text style={styles.completedText}>Completed:</Text>
                  <Text style={styles.completedList}>
                    {logItem.completed.map((exercise, exerciseIndex) => (
                      <Text key={exerciseIndex} style={styles.completedListItem}>
                        {exercise},
                      </Text>
                    ))}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    marginTop: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  completedContainer: {
    marginTop: 10,
  },
  completedText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  completedList: {
    marginTop: 5,
  },
  completedListItem: {
    fontSize: 14,
    marginLeft: 15,
    // Add a style to separate items with a newline
    marginBottom: 5,
  },
});

export default ActivityLogScreen;
