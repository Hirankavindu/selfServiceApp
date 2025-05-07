import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";

const myTrainingEdit = () => {
  const renderTrainingDetails = () => {
    return (
      <View style={styles.scheduleContainer}>
        <View style={styles.trainingItem}>
          <Text style={styles.trainingText}>Start new training programme</Text>
          <Text style={styles.trainingTime}>8:00 a.m - 8:10 a.m</Text>
          <Text style={[styles.status, styles.greenStatus]}>✔</Text>
        </View>
        <View style={styles.trainingItem}>
          <Text style={styles.trainingText}>Start new training programme</Text>
          <Text style={styles.trainingTime}>8:10 a.m - 8:20 a.m</Text>
          <Text style={[styles.status, styles.purpleStatus]}>✔</Text>
        </View>
        <View style={styles.trainingItem}>
          <Text style={styles.trainingText}>Start new training programme</Text>
          <Text style={styles.trainingTime}>8:20 a.m - 8:30 a.m</Text>
          <Text style={[styles.status, styles.orangeStatus]}>✘</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Training</Text>
      </View>

      {/* Calendar */}
      <Calendar
        style={styles.calendar}
        markedDates={{
          "2025-02-17": { selected: true, marked: true, selectedColor: "blue" },
        }}
        theme={{
          arrowColor: "orange",
          todayTextColor: "green",
        }}
      />

      {renderTrainingDetails()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  calendar: {
    marginBottom: 20,
  },
  scheduleContainer: {
    paddingTop: 10,
  },
  trainingItem: {
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trainingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  trainingTime: {
    fontSize: 14,
    color: "gray",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  greenStatus: {
    color: "green",
  },
  purpleStatus: {
    color: "purple",
  },
  orangeStatus: {
    color: "orange",
  },
});

export default myTrainingEdit;
