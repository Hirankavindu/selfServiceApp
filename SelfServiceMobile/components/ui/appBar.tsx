import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type AppBarProps = {
  menuOpen: boolean; // <-- New prop for state
  toggleMenu: () => void;
};

const AppBar: React.FC<AppBarProps> = ({ menuOpen, toggleMenu }) => {
  const slideAnim = useRef(new Animated.Value(-250)).current;
    const router = useRouter();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : -250, // <-- Now this is a boolean!
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuOpen]); // <-- Use the state, not the function

  return (
    <View style={styles.safeArea}>
      <View style={styles.appBar}>
        <Text style={styles.appBarText}>Shop n' Office</Text>
        <View style={styles.appBarButton}>
          <View style={styles.appBarIcon}>
            <Ionicons name="notifications" size={24} color="#FF1EAD" />
          </View>
          <TouchableOpacity onPress={toggleMenu}>
            <View style={styles.appBarIcon}>
              <Ionicons name="menu" size={24} color="#FF1EAD" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        style={[styles.sliderMenu, { transform: [{ translateX: slideAnim }] }]}
      >
        <Text style={styles.menuTitle}>Shop n' Office</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="document-text" size={20} color="#000" />
          <Text style={styles.menuText}>My Pay Slip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="time" size={20} color="#000" />
          <Text style={styles.menuText}>My Timesheet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/myTraining")}
        >
          <Ionicons name="school" size={20} color="#000" />
          <Text style={styles.menuText}>My Training</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="calendar" size={20} color="#000" />
          <Text style={styles.menuText}>My Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="log-out" size={20} color="#000" />
          <Text style={styles.menuText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};


export default AppBar;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    overflow: "visible", // Allow child components to overflow
  },

  appBar: {
    backgroundColor: "#FFC31E",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  appBarIcon: {
    height: 40,
    width: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  appBarButton: {
    flexDirection: "row",
    gap: 10,
  },

  appBarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  sliderMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: 900,
    backgroundColor: "#fff",
    zIndex: 10000, // Make sure it's on top
    elevation: 10, // For Android shadow
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFC31E",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  menuText: {
    fontSize: 16,
    marginLeft: 15,
  },
});
