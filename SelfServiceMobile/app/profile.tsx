import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useRouter } from "expo-router";


const profile = () => {
      const router = useRouter();
      const navigation = useNavigation();
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
          {/* header row */}
          <View style={styles.HeaderRow}>
            {/* Dashboard text */}
            <Text style={styles.dashboardText}>My Profile</Text>
            <TouchableOpacity>
              <Feather name="edit" size={24} color="#FF1EAD" />
            </TouchableOpacity>
          </View>

          {/* Profile image */}
          <View style={styles.profileContainer}>
            <Image
              source={require("../assets/images/profile.png")}
              style={styles.profileImage}
            />

            <View style={styles.profileText}>
              <Text style={styles.profileName}>James Perera</Text>
              <View style={styles.onlineStatus}>
                <View style={styles.onlineStatusDot}></View>
                <Text style={styles.onlineStatusText}>Active</Text>
              </View>
            </View>

            {/* User details */}
            <View style={styles.UserDetailsBox}>
              {/* User details Point */}
              <View style={styles.UserDetails}>
                <Text style={styles.UserDetailsPoint}>Full Name</Text>
                <Text style={styles.UserDetailsPointSub}>
                  Michel James Perera
                </Text>
              </View>

              {/* User details Point */}
              <View style={styles.UserDetails}>
                <Text style={styles.UserDetailsPoint}>Email</Text>
                <Text style={styles.UserDetailsPointSub}>James@gmail.com</Text>
              </View>

              {/* User details Point */}
              <View style={styles.UserDetails}>
                <Text style={styles.UserDetailsPoint}>Contact Number</Text>
                <Text style={styles.UserDetailsPointSub}>+94772114540</Text>
              </View>

              {/* User details Point */}
              <View style={styles.UserDetails}>
                <Text style={styles.UserDetailsPoint}>Work Type</Text>
                <Text style={styles.UserDetailsPointSub}>Permanent</Text>
              </View>

              <View>
                <Button
                  mode="contained"
                  style={styles.loginButton}
                  onPress={() =>
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: "tabs" }],
                      })
                    )
                  }
                >
                  View More Details
                </Button>
              </View>
            </View>

            <Button
              mode="contained"
              style={styles.logOut}
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "tabs" }],
                  })
                )
              }
            >
              Log out
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

  appBar: {
    marginTop: 24,
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
    color: "#2EC349",
    fontWeight: "600",
    fontSize: 16,
  },
  onlineStatusDot: {
    height: 16,
    width: 16,
    borderRadius: 20,
    backgroundColor: "#2EC349",
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
  loginButton: {
    width: "100%",
    backgroundColor: "#FF647F",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 40,
  },
  logOut:{
    
  },
});
