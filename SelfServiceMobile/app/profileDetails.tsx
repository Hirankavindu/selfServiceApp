import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const profileDetails = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarText}>Shop n' Office</Text>
        <View style={styles.appBarButton}>
          <View style={styles.appBarIcon}>
            <Ionicons name="notifications" size={24} color="#FF1EAD" />
          </View>
          <View style={styles.appBarIcon}>
            <Ionicons name="menu" size={24} color="#FF1EAD" />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Start */}
        <View style={styles.container}>
          {/* Dashboard text */}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profileDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  appBar: {
    marginTop: 23,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFC31E",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    display: "flex",
    flexDirection: "row",
    paddingInline: 20,
  },

  appBarIcon: {
    height: 40,
    width: 40,
    backgroundColor: "#fff",
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  appBarButton: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  appBarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    marginTop: 70, // Ensures content does not overlap with the app bar
    padding: 10,
  },

  scrollContainer: {
    paddingBottom: 20,
  },
});