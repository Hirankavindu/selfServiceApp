import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppBar from "@/components/ui/appBar";
import {
  apiService,
  LoginResponse,
  PersonalDetails,
} from "../service/api.service";

// Define the complete user profile type
interface CompleteUserProfile {
  loginData: LoginResponse;
  personalDetails: PersonalDetails;
}

const profile = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<CompleteUserProfile | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the new method to get complete user profile
      const profileData = await apiService.getCompleteUserProfile();
      setUserProfile(profileData);

      console.log("Profile data loaded successfully:", profileData);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);

      // If it's a login-related error, redirect to login
      if (errorMessage.includes("login again")) {
        Alert.alert("Session Expired", "Please login again to continue.", [
          {
            text: "OK",
            onPress: () => handleLogout(),
          },
        ]);
      } else {
        Alert.alert("Error", "Failed to load user profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchUserProfile();
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Refetch data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      await AsyncStorage.removeItem("userData");

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "register" }],
        })
      );
    } catch (err) {
      console.error("Error during logout:", err);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  // Show loading screen while fetching data
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF647F" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error screen if data failed to load
  if (error && !userProfile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={64} color="#FF647F" />
          <Text style={styles.errorTitle}>Failed to Load Profile</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <Button
            mode="contained"
            style={styles.retryButton}
            onPress={handleRetry}
          >
            Retry
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  // Safely extract data with proper null checks
  const loginData = userProfile?.loginData || null;
  const personalDetails = userProfile?.personalDetails || null;

  // Format display name
  const getDisplayName = (): string => {
    if (personalDetails?.fullName) {
      return personalDetails.fullName;
    }
    if (loginData?.empFirstname && loginData?.empOtherName) {
      return `${loginData.empFirstname.trim()} ${loginData.empOtherName.trim()}`;
    }
    return loginData?.userName || "User";
  };

  // Format full name
  const getFullName = (): string => {
    if (personalDetails) {
      const { title, initials, lastname, fullName } = personalDetails;
      return `${title || ""} ${initials || ""} ${lastname || ""} ${
        fullName || ""
      }`.trim();
    }
    return (
      `${loginData?.empFirstname || ""} ${
        loginData?.empOtherName || ""
      }`.trim() || "Not available"
    );
  };

  // Format status display
  const getStatusColor = (): string => {
    const status = loginData?.status?.toLowerCase();
    return status === "active" ? "#2EC349" : "#FF647F";
  };

  const getStatusText = (): string => {
    const status = loginData?.status;
    return status
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : "Active";
  };

  const handleEditProfile = () => {
    // Navigate to edit profile - you'll need to update this path according to your routing setup
    router.push("/(tabs)/editProfile" as any);
  };

  const handleViewMoreDetails = () => {
    // Navigate to profile details - you'll need to update this path according to your routing setup
    router.push("/(tabs)/profileDetails" as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* App Bar */}
      <AppBar menuOpen={menuOpen} toggleMenu={toggleMenu} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Start */}
        <View style={styles.container}>
          {/* header row */}
          <View style={styles.HeaderRow}>
            {/* Dashboard text */}
            <Text style={styles.dashboardText}>My Profile</Text>
            <TouchableOpacity onPress={handleEditProfile}>
              <Feather name="edit" size={24} color="#FF1EAD" />
            </TouchableOpacity>
          </View>

          {/* Profile image */}
          <View style={styles.profileContainer}>
            <Image
              source={
                loginData?.userImg?.[0]?.imgUrl
                  ? { uri: loginData.userImg[0].imgUrl }
                  : require("../assets/images/profile.png")
              }
              style={styles.profileImage}
              onError={() => {
                // Handle image load error - could set a state to force fallback
                console.log("Failed to load profile image");
              }}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{getDisplayName()}</Text>
              <View style={styles.onlineStatus}>
                <View
                  style={[
                    styles.onlineStatusDot,
                    { backgroundColor: getStatusColor() },
                  ]}
                ></View>
                <Text
                  style={[styles.onlineStatusText, { color: getStatusColor() }]}
                >
                  {getStatusText()}
                </Text>
              </View>
            </View>

            {/* User details */}
            <View style={styles.UserDetailsBox}>
              {/* Basic Info */}
              <View style={styles.UserDetails}>
                <Text style={styles.UserDetailsPoint}>Full Name</Text>
                <Text style={styles.UserDetailsPointSub}>{getFullName()}</Text>
              </View>

              <View style={styles.UserDetails}>
                <Text style={styles.UserDetailsPoint}>Employee ID</Text>
                <Text style={styles.UserDetailsPointSub}>
                  {loginData?.empId || "Not available"}
                </Text>
              </View>

              <View style={styles.UserDetails}>
                <Text style={styles.UserDetailsPoint}>Email</Text>
                <Text style={styles.UserDetailsPointSub}>
                  {loginData?.empEmail || "Not available"}
                </Text>
              </View>

              <View style={styles.UserDetails}>
                <Text style={styles.UserDetailsPoint}>Contact Number</Text>
                <Text style={styles.UserDetailsPointSub}>
                  {loginData?.empContactNumber || "Not available"}
                </Text>
              </View>

              <View style={styles.UserDetails}>
                <Text style={styles.UserDetailsPoint}>Work Type</Text>
                <Text style={styles.UserDetailsPointSub}>
                  {loginData?.empTypeName || "Not available"}
                </Text>
              </View>

              {/* Personal Details */}
              {personalDetails && (
                <>
                  <View style={styles.sectionDivider}></View>

                  <View style={styles.UserDetails}>
                    <Text style={styles.UserDetailsPoint}>Date of Birth</Text>
                    <Text style={styles.UserDetailsPointSub}>
                      {personalDetails.dob || "Not available"}
                    </Text>
                  </View>

                  <View style={styles.UserDetails}>
                    <Text style={styles.UserDetailsPoint}>Gender</Text>
                    <Text style={styles.UserDetailsPointSub}>
                      {personalDetails.gender
                        ? personalDetails.gender.charAt(0).toUpperCase() +
                          personalDetails.gender.slice(1)
                        : "Not available"}
                    </Text>
                  </View>

                  <View style={styles.UserDetails}>
                    <Text style={styles.UserDetailsPoint}>Nationality</Text>
                    <Text style={styles.UserDetailsPointSub}>
                      {personalDetails.nationality || "Not available"}
                    </Text>
                  </View>

                  <View style={styles.UserDetails}>
                    <Text style={styles.UserDetailsPoint}>Marital Status</Text>
                    <Text style={styles.UserDetailsPointSub}>
                      {personalDetails.materialStatus
                        ? personalDetails.materialStatus
                            .charAt(0)
                            .toUpperCase() +
                          personalDetails.materialStatus.slice(1)
                        : "Not available"}
                    </Text>
                  </View>

                  {personalDetails.religion && (
                    <View style={styles.UserDetails}>
                      <Text style={styles.UserDetailsPoint}>Religion</Text>
                      <Text style={styles.UserDetailsPointSub}>
                        {personalDetails.religion}
                      </Text>
                    </View>
                  )}

                  {personalDetails.bloodGroup && (
                    <View style={styles.UserDetails}>
                      <Text style={styles.UserDetailsPoint}>Blood Group</Text>
                      <Text style={styles.UserDetailsPointSub}>
                        {personalDetails.bloodGroup}
                      </Text>
                    </View>
                  )}
                </>
              )}

              <View>
                <Button
                  mode="contained"
                  style={styles.loginButton}
                  onPress={handleViewMoreDetails}
                >
                  View More Details
                </Button>
              </View>
            </View>

            <Button
              mode="contained"
              style={styles.logOut}
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={20} color="#FF647F" />
              <Text style={styles.btnText}>Log out</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  loadingText: {
    fontSize: 16,
    color: "#666",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 40,
  },

  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },

  errorMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },

  retryButton: {
    backgroundColor: "#FF647F",
    paddingHorizontal: 30,
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

  HeaderRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 40,
    gap: 20,
  },

  profileImage: {
    height: 120,
    width: 120,
    backgroundColor: "#2354",
    borderRadius: 20,
  },

  profileText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  profileName: {
    fontSize: 18,
    fontWeight: "700",
  },

  onlineStatus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  onlineStatusText: {
    fontWeight: "600",
    fontSize: 16,
  },

  onlineStatusDot: {
    height: 16,
    width: 16,
    borderRadius: 20,
  },

  UserDetailsBox: {
    display: "flex",
    flexDirection: "column",
    marginInline: 20,
    borderStyle: "solid",
    borderColor: "#FF647F",
    borderRadius: 20,
    width: "100%",
    borderWidth: 2,
    paddingBlock: 40,
    paddingInline: 20,
    gap: 20,
  },

  UserDetails: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  UserDetailsPoint: {
    fontSize: 16,
    fontWeight: "700",
  },

  UserDetailsPointSub: {
    fontSize: 16,
    fontWeight: "400",
  },

  sectionDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },

  loginButton: {
    width: "100%",
    backgroundColor: "#FF647F",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 40,
  },

  logOut: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
  },

  btnText: {
    color: "#FF647F",
    fontSize: 18,
    fontWeight: "bold",
  },
});
