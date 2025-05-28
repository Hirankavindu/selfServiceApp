import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import AppBar from "@/components/ui/appBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the interface for leave data
interface LeaveData {
  entitlementId: string;
  leaveTypeName: string;
  leaveAmount: number;
  takenAmount: number;
}

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [leaveData, setLeaveData] = useState<LeaveData[]>([]);
  const [loadingLeave, setLoadingLeave] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Function to get random background colors for leave cards
  const getCardColor = (index: number) => {
    const colors = [
      "#5FF3F3", // Cyan
      "#77FFA2", // Green
      "#FCC4FD", // Pink
      "#FFE55C", // Yellow
      "#FF9F80", // Orange
      "#A0C4FF", // Blue
      "#D4A5FF", // Purple
      "#FFB3BA", // Light Pink
    ];
    return colors[index % colors.length];
  };

  // Function to fetch leave data from API
  const fetchLeaveData = async () => {
    try {
      setLoadingLeave(true);

      // Get user data from AsyncStorage
      const storedUserData = await AsyncStorage.getItem("userData");
      if (!storedUserData) {
        console.error("No user data found in storage");
        return;
      }

      const parsedUserData = JSON.parse(storedUserData);
      const empId = parsedUserData.empId;
      const companyId = parsedUserData.empCompanyID;

      if (!empId) {
        console.error("Employee ID not found in user data");
        Alert.alert("Error", "Employee ID not found. Please login again.");
        return;
      }

      console.log(
        "Fetching leave data for empId:",
        empId,
        "companyId:",
        companyId
      );

      const response = await fetch(
        `http://216.55.186.115:8040/HRMSystem/api/v1/dashboard/leave_count?emp_id=${empId}&company_id=${companyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Leave data response:", data);

      if (Array.isArray(data)) {
        setLeaveData(data);
      } else {
        console.error("Invalid leave data format:", data);
        setLeaveData([]);
      }
    } catch (error) {
      console.error("Error fetching leave data:", error);
      Alert.alert("Error", "Failed to fetch leave data. Please try again.");
      setLeaveData([]);
    } finally {
      setLoadingLeave(false);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const stored = await AsyncStorage.getItem("userData");
        if (stored) {
          const parsedData = JSON.parse(stored);
          setUserData(parsedData);
          console.log("Loaded user data:", parsedData);
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };

    loadUserData();
  }, []);

  // Fetch leave data when component mounts and userData is available
  useEffect(() => {
    if (userData) {
      fetchLeaveData();
    }
  }, [userData]);

  // Calculate remaining leave amount
  const getRemainingLeave = (leaveAmount: number, takenAmount: number) => {
    return Math.max(0, leaveAmount - takenAmount);
  };

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
                  ? `${userData.empFirstname || ""} ${
                      userData.empOtherName || ""
                    }`.trim()
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
                  {userData?.empContactNumber || "-"}
                </Text>
              </View>

              <View style={styles.dashboardData}>
                <MaterialIcons
                  name="person-outline"
                  size={16}
                  color="#FF1EAD"
                />
                <Text style={styles.dashboardDataText}>
                  ID: {userData?.empId || "-"}
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
          <View style={styles.leaveSection}>
            <Text style={styles.sectionHead}>My Leave</Text>
            {loadingLeave && (
              <ActivityIndicator
                size="small"
                color="#FF647F"
                style={styles.loadingIndicator}
              />
            )}
          </View>

          {/* Horizontally Scrollable Leave Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.leaveScrollContainer}
            style={styles.leaveScrollView}
          >
            {leaveData.length > 0
              ? leaveData.map((leave, index) => (
                  <View
                    key={leave.entitlementId}
                    style={[
                      styles.myLeaveCard,
                      { backgroundColor: getCardColor(index) },
                    ]}
                  >
                    <Text style={styles.LeaveCardHeader} numberOfLines={2}>
                      {leave.leaveTypeName}
                    </Text>
                    <Text style={styles.LeaveCardCount}>
                      {getRemainingLeave(leave.takenAmount, leave.leaveAmount)}
                    </Text>
                    <Text style={styles.LeaveCardSubText}>
                      of {leave.leaveAmount}
                    </Text>
                  </View>
                ))
              : !loadingLeave && (
                  <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                      No leave data available
                    </Text>
                  </View>
                )}
          </ScrollView>

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
    flex: 1,
  },
  employeeName: {
    fontSize: 15,
    fontWeight: "800",
  },
  dashboardData: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  dashboardDataText: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  dashboardActivebtn: {
    color: "#008B23",
    fontWeight: "700",
  },

  leaveSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionHead: {
    fontSize: 17,
    fontWeight: "700",
  },
  loadingIndicator: {
    marginLeft: 10,
  },

  leaveScrollView: {
    marginBottom: 10,
  },
  leaveScrollContainer: {
    paddingHorizontal: 5,
    gap: 15,
  },
  myLeaveCard: {
    width: 120,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    paddingHorizontal: 8,
  },
  LeaveCardHeader: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 5,
  },
  LeaveCardCount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  LeaveCardSubText: {
    fontSize: 10,
    fontWeight: "400",
    color: "#666",
    marginTop: 2,
  },

  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  noDataText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },

  upComingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
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
