import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
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
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import AppBar from "@/components/ui/appBar";
import { apiService, LeaveData } from "@/service/api.service";

function leavePage() {
  const navigation = useNavigation();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaveData, setLeaveData] = useState<LeaveData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Function to fetch leave data
  const fetchLeaveData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getLeaveCountForCurrentUser();
      setLeaveData(data);
    } catch (err) {
      console.error("Error fetching leave data:", err);
      setError("Failed to load leave data. Please try again.");
      Alert.alert("Error", "Failed to load leave data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  // Function to get icon based on leave type
  const getLeaveIcon = (leaveTypeName: string) => {
    const lowerCaseType = leaveTypeName.toLowerCase();

    if (lowerCaseType.includes("annual")) {
      return (
        <MaterialCommunityIcons
          name="calendar-blank-multiple"
          size={28}
          color="black"
        />
      );
    } else if (
      lowerCaseType.includes("casual") ||
      lowerCaseType.includes("day off")
    ) {
      return <AntDesign name="adduser" size={28} color="black" />;
    } else if (lowerCaseType.includes("short")) {
      return <Octicons name="checklist" size={28} color="black" />;
    } else if (
      lowerCaseType.includes("medical") ||
      lowerCaseType.includes("sick")
    ) {
      return (
        <MaterialCommunityIcons
          name="heart-remove-outline"
          size={28}
          color="black"
        />
      );
    } else {
      return (
        <MaterialCommunityIcons name="calendar-clock" size={28} color="black" />
      );
    }
  };

  // Function to calculate remaining leave
  const getRemainingLeave = (leaveAmount: number, takenAmount: number) => {
    return Math.max(0, leaveAmount - takenAmount);
  };

  return (
    <SafeAreaView>
      {/* App Bar */}
      <AppBar menuOpen={menuOpen} toggleMenu={toggleMenu} />

      {/* App Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Start */}
        <View style={styles.container}>
          {/* Dashboard text */}
          <Text style={styles.dashboardText}>Leave</Text>

          {/* Leave Button */}
          <View style={styles.plusBtnRow}>
            <TouchableOpacity
              style={styles.plusBtn}
              onPress={() => router.push("/leaveAdd")}
            >
              <AntDesign name="plus" size={24} color="#FF1EAD" />
            </TouchableOpacity>
          </View>

          {/* Loading State */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF1EAD" />
              <Text style={styles.loadingText}>Loading leave data...</Text>
            </View>
          )}

          {/* Error State */}
          {error && !loading && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchLeaveData}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Leave Cards */}
          {!loading && !error && (
            <View style={styles.LeaveColum}>
              {leaveData.length > 0 ? (
                leaveData.map((leave, index) => (
                  <View
                    key={leave.entitlementId || index}
                    style={styles.LeaveCard}
                  >
                    <View style={styles.LeaveCardData}>
                      <Text style={styles.LeaveCardDataHead}>
                        {leave.leaveTypeName}
                      </Text>
                      <Text style={styles.LeaveCardDataBody}>
                        {getRemainingLeave(
                          leave.takenAmount,
                          leave.takenAmount
                        )}
                      </Text>
                      <Text style={styles.LeaveCardDataSubtext}>
                        of {leave.leaveAmount} days
                      </Text>
                    </View>
                    {getLeaveIcon(leave.leaveTypeName)}
                  </View>
                ))
              ) : (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No leave data available</Text>
                </View>
              )}
            </View>
          )}

          {/* My Leave date filters */}
          <View style={styles.DateFilter}>
            <Text style={styles.dashboardText}>My Leave History</Text>
            <View style={styles.DateFilterRow}>
              {/* Calendar - You can add date filter functionality here */}
              <TouchableOpacity style={styles.filterButton}>
                <MaterialCommunityIcons
                  name="calendar-range"
                  size={20}
                  color="#FF1EAD"
                />
                <Text style={styles.filterButtonText}>Filter by Date</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default leavePage;

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
    marginTop: 70,
    padding: 10,
  },

  dashboardText: {
    fontSize: 20,
    fontWeight: "700",
  },

  scrollContainer: {
    paddingBottom: 20,
  },

  plusBtn: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },

  plusBtnRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  LeaveColum: {
    display: "flex",
    flexDirection: "column",
  },

  LeaveCard: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#ADF3FF",
    marginTop: 20,
    justifyContent: "space-between",
    paddingInline: 20,
    paddingBlock: 20,
    alignItems: "center",
    shadowColor: "#0386C8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },

  LeaveCardData: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  LeaveCardDataHead: {
    fontSize: 14,
    fontWeight: "600",
  },

  LeaveCardDataBody: {
    fontSize: 20,
    fontWeight: "700",
  },

  LeaveCardDataSubtext: {
    fontSize: 12,
    color: "#666",
    fontWeight: "400",
  },

  DateFilter: {
    paddingTop: 24,
  },

  DateFilterRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  filterButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#FF1EAD",
    fontWeight: "500",
  },

  // Loading styles
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },

  // Error styles
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 15,
  },

  retryButton: {
    backgroundColor: "#FF1EAD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // No data styles
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
