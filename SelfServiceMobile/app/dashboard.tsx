import { View, Text, StyleSheet,Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Dashboard = () => {
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

      {/* Content Start */}
      <View style={styles.container}>
        {/* Dashboard text */}
        <Text style={styles.dashboardText}>My Dashboard</Text>
        {/* Card */}
        <View style={styles.dashboardBanner}>
          <Image
            source={require("../assets/images/profile.png")}
            style={styles.profileImage}
          />
        
        {/* card details */}
          <View style={styles.cardDetails}>
            <Text>hgfhj</Text>
            <Text>hfj</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  appBar: {
    marginTop: 28,
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

  dashboardText: {
    fontSize: 20,
    fontWeight: "700",
  },

  dashboardBanner: {
    height: 150,
    width: "100%",
    backgroundColor: "#F6E4A8",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 25,
    paddingHorizontal: 25,
    alignItems:'center'
  },

  imageContainer: {
    borderRadius: 20,
    width: 120,
    height: 120,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 20, // Curves the edges
  },
  cardDetails:{
    display: 'flex',
    flexDirection: 'column',
    paddingLeft:20,
  }
});
