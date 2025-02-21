import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const performance = () => {
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
          <Text style={styles.dashboardText}>Performance</Text>

          {/* Performance */}
          <View style={styles.upcoming}>
            {/* Program card */}
            <View style={styles.programCard}>
              <View style={styles.trainingContent}>
                <View style={styles.rowText}>
                  <Text style={styles.trainingBold}>Completed</Text>
                  <Text style={styles.trainingBold}>| Appraisals</Text>
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.trainingBold}>00</Text>
                  <Text>Total</Text>
                </View>
              </View>
              <View style={styles.trainingContent}>
                <FontAwesome name="check-circle" size={30} color="green" />
              </View>
            </View>

            {/* Program card */}
            <View style={styles.programCard}>
              <View style={styles.trainingContent}>
                <View style={styles.rowText}>
                  <Text style={styles.trainingBold}>Ongoing</Text>
                  <Text style={styles.trainingBold}>| Appraisals</Text>
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.trainingBold}>00</Text>
                  <Text>Total</Text>
                </View>
              </View>
              <View style={styles.trainingContent}>
                <FontAwesome name="check-circle" size={30} color="green" />
              </View>
            </View>

            {/* Program card */}
            <View style={styles.programCard}>
              <View style={styles.trainingContent}>
                <View style={styles.rowText}>
                  <Text style={styles.trainingBold}>Due</Text>
                  <Text style={styles.trainingBold}>| Appraisals</Text>
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.trainingBold}>00</Text>
                  <Text>Total</Text>
                </View>
              </View>
              <View style={styles.trainingContent}>
                <FontAwesome name="check-circle" size={30} color="green" />
              </View>
            </View>
          </View>

          {/* Competed ongoing Due */}
          <View style={styles.tabBtn}>
            {/* Tab Button */}
            <View style={styles.tabBtn1}>
              <View style={styles.dotBtn}></View>
              <Text style={styles.dotBtnText}>Completed</Text>
            </View>

            {/* Tab Button */}
            <View style={styles.tabBtn1}>
              <View style={styles.dotBtn1}></View>
              <Text style={styles.dotBtnText1}>Completed</Text>
            </View>

            {/* Tab Button */}
            <View style={styles.tabBtn1}>
              <View style={styles.dotBtn2}></View>
              <Text style={styles.dotBtnText2}>Completed</Text>
            </View>
          </View>
          {/* Expanded List */}
          <View>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default performance;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Proper shadow format
    borderColor: "#0000",
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
  cardDetails: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 20,
    gap: 5,
  },
  dashboardData: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  DashboardDataText: {
    fontSize: 13,
    fontWeight: "500",
  },
  EmployeeName: {
    fontSize: 15,
    fontWeight: "800",
  },
  dashboardDataText: {
    fontSize: 13,
    fontWeight: "500",
  },

  employeeName: {
    fontSize: 15,
    fontWeight: "800",
  },
  dashboardActivebtn: {
    color: "#008B23",
    fontWeight: "700",
  },
  myLeaveCard: {
    width: "30%",
    height: 80,
    backgroundColor: "#5FF3F3",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHead: {
    paddingTop: 20,
    fontSize: 17,
    fontWeight: "700",
    paddingBottom: 20,
  },
  LeaveCardHeader: {
    fontSize: 14,
    fontWeight: "500",
  },
  LeaveCardCount: {
    fontSize: 20,
    fontWeight: "600",
  },
  myLeaveCard2: {
    width: "30%",
    height: 80,
    backgroundColor: "#77FFA2",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  myLeaveCard3: {
    width: "30%",
    height: 80,
    backgroundColor: "#FCC4FD",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upComingOption: {
    display: "flex",
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
    display: "flex",
    flexDirection: "row",
    paddingBlock: 20,
    paddingInline: 10,
    gap: 10,
    justifyContent: "space-between",
    borderRadius: 10,
  },
  trainingContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  trainingBold: {
    fontWeight: "700",
  },
  scrollContainer: {
    paddingBottom: 20,
  },

  rowText: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  tabBtn: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
    marginTop: 40,
  },
  tabBtn1: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  dotBtn: {
    width: 16,
    height: 16,
    backgroundColor: "#27AA03",
    borderRadius: 20,
  },
  dotBtnText: {
    color: "#27AA03",
  },

  dotBtn1: {
    width: 16,
    height: 16,
    backgroundColor: "#CCB100",
    borderRadius: 20,
  },
  dotBtnText1: {
    color: "#CCB100",
  },

  dotBtn2: {
    width: 16,
    height: 16,
    backgroundColor: "#E81D5E",
    borderRadius: 20,
  },
  dotBtnText2: {
    color: "#E81D5E",
  },
});
