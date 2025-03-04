import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import AppBar from "@/components/ui/appBar";

function leavePage() {
  const navigation = useNavigation();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen((prev) => !prev);
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

          {/* Leave tabs */}
          <View style={styles.LeaveColum}>
            <View style={styles.LeaveCard}>
              <View style={styles.LeaveCardData}>
                <Text style={styles.LeaveCardDataHead}>Annual Leave</Text>
                <Text style={styles.LeaveCardDataBody}>00</Text>
              </View>
              <MaterialCommunityIcons
                name="calendar-blank-multiple"
                size={28}
                color="black"
              />
            </View>

            <View style={styles.LeaveCard}>
              <View style={styles.LeaveCardData}>
                <Text style={styles.LeaveCardDataHead}>Casual Leave</Text>
                <Text style={styles.LeaveCardDataBody}>10</Text>
              </View>
              <AntDesign name="adduser" size={28} color="black" />
            </View>

            <View style={styles.LeaveCard}>
              <View style={styles.LeaveCardData}>
                <Text style={styles.LeaveCardDataHead}>Short Leave</Text>
                <Text style={styles.LeaveCardDataBody}>15</Text>
              </View>
              <Octicons name="checklist" size={28} color="black" />
            </View>

            <View style={styles.LeaveCard}>
              <View style={styles.LeaveCardData}>
                <Text style={styles.LeaveCardDataHead}>Medical Leave</Text>
                <Text style={styles.LeaveCardDataBody}>15</Text>
              </View>
              <MaterialCommunityIcons
                name="heart-remove-outline"
                size={28}
                color="black"
              />
            </View>
          </View>

          {/* My Lave date filters */}
          <View style={styles.DateFilter}>
            <Text style={styles.dashboardText}>Leave</Text>
            <View style={styles.DateFilterRow}>
              {/* Calendar */}
              <View></View>
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
  plusBtn: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
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
    boxShadow: "0px 4px 10px rgba(3, 134, 200, 0.2)",
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
  DateFilter: {
    paddingTop: 24,
  },
  DateFilterRow:{
    display:'flex',
    flexDirection:'row',
    marginTop:10,
  },
});
