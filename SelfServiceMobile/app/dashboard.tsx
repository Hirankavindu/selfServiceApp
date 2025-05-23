import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import AppBar from "@/components/ui/appBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const stored = await AsyncStorage.getItem("userData");
        if (stored) {
          setUserData(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };

    loadUserData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar menuOpen={menuOpen} toggleMenu={toggleMenu} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.dashboardText}>My Dashboard</Text>

          {/* Profile Card */}
          <View style={styles.dashboardBanner}>
            <Image
              source={
                userData?.profileImageUrl
                  ? { uri: userData.profileImageUrl }
                  : require("../assets/images/profile.png")
              }
              style={styles.profileImage}
            />

            <View style={styles.cardDetails}>
              <Text style={styles.employeeName}>
                {userData
                  ? `${userData.empFirstname} ${userData.empOtherName}`
                  : "Loading..."}
              </Text>

              <View style={styles.dashboardData}>
                <Feather name="mail" size={16} color="#FF1EAD" />
                <Text style={styles.dashboardDataText}>
                  {userData?.empEmail || "-"}
                </Text>
              </View>

              <View style={styles.dashboardData}>
                <Ionicons name="call" size={16} color="#FF1EAD" />
                <Text style={styles.dashboardDataText}>
                  {userData?.empId || "-"}
                </Text>
              </View>

              <View style={styles.dashboardData}>
                <MaterialIcons name="work" size={16} color="#FF1EAD" />
                <Text style={styles.dashboardDataText}>
                  {userData?.empTypeName || "-"}
                </Text>
              </View>

              <View style={styles.dashboardData}>
                <Fontisto name="radio-btn-active" size={16} color="#008B23" />
                <Text style={styles.dashboardActivebtn}>
                  {userData?.userLevelDesc || "N/A"}
                </Text>
              </View>
            </View>
          </View>

          {/* My Leave Section */}
          <Text style={styles.sectionHead}>My Leave</Text>
          <View style={styles.sectionBox}>
            <View style={styles.myLeaveCard}>
              <Text style={styles.LeaveCardHeader}>Annual Leave</Text>
              <Text style={styles.LeaveCardCount}>00</Text>
            </View>

            <View style={styles.myLeaveCard2}>
              <Text style={styles.LeaveCardHeader}>Casual Leave</Text>
              <Text style={styles.LeaveCardCount}>10</Text>
            </View>

            <View style={styles.myLeaveCard3}>
              <Text style={styles.LeaveCardHeader}>Short Leave</Text>
              <Text style={styles.LeaveCardCount}>15</Text>
            </View>
          </View>

          {/* Upcoming Training Programs */}
          <View style={styles.upComingOption}>
            <Text style={styles.sectionHead}>Upcoming Training Programs</Text>
            <TouchableOpacity>
              <Entypo name="dots-three-horizontal" size={16} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.upcoming}>
            {[1, 2, 3].map((_, i) => (
              <View style={styles.programCard} key={i}>
                <View style={styles.trainingContent}>
                  <Text>Today</Text>
                  <Text style={styles.trainingBold}>
                    Start new training programs
                  </Text>
                  <Text>Start 8.00a.m - 8.10a.m </Text>
                </View>
                <View style={styles.trainingContent}>
                  <Feather name="arrow-right-circle" size={30} color="black" />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { paddingBottom: 20 },
  container: { flex: 1, marginTop: 70, padding: 10 },
  dashboardText: { fontSize: 20, fontWeight: "700" },

  dashboardBanner: {
    height: 150,
    width: "100%",
    backgroundColor: "#F6E4A8",
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    padding: 25,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  cardDetails: {
    flexDirection: "column",
    paddingLeft: 20,
    gap: 5,
  },
  employeeName: {
    fontSize: 15,
    fontWeight: "800",
  },
  dashboardData: {
    flexDirection: "row",
    gap: 8,
  },
  dashboardDataText: {
    fontSize: 13,
    fontWeight: "500",
  },
  dashboardActivebtn: {
    color: "#008B23",
    fontWeight: "700",
  },

  sectionHead: {
    paddingTop: 20,
    fontSize: 17,
    fontWeight: "700",
    paddingBottom: 20,
  },
  sectionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  myLeaveCard: {
    width: "30%",
    height: 80,
    backgroundColor: "#5FF3F3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  myLeaveCard2: {
    width: "30%",
    height: 80,
    backgroundColor: "#77FFA2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  myLeaveCard3: {
    width: "30%",
    height: 80,
    backgroundColor: "#FCC4FD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  LeaveCardHeader: {
    fontSize: 14,
    fontWeight: "500",
  },
  LeaveCardCount: {
    fontSize: 20,
    fontWeight: "600",
  },

  upComingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upcoming: {
    paddingTop: 20,
    gap: 16,
  },
  programCard: {
    backgroundColor: "#C8FFBE",
    width: "100%",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 10,
    justifyContent: "space-between",
    borderRadius: 10,
  },
  trainingContent: {
    flexDirection: "column",
    gap: 4,
  },
  trainingBold: {
    fontWeight: "700",
  },
});
