import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "@/components/ui/appBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

const myTraining = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Extended date range to allow scrolling
  const datesWhitelist = [
    {
      start: moment().subtract(10, "days"), // 10 days ago
      end: moment().add(30, "days"), // 30 days ahead
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <AppBar menuOpen={menuOpen} toggleMenu={toggleMenu} />

        <View style={styles.container}>
          {/* back navigation */}
          <TouchableOpacity style={styles.backNavigation}>
            <Ionicons name="chevron-back" size={24} color="black" />
            <Text style={styles.backNavigationText}>My Training</Text>
          </TouchableOpacity>

          {/* Calendar Row */}
          <View style={styles.CalendarRow}>
            <View style={styles.CalendarRowBtn}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={24}
                color="black"
              />
              <Text style={styles.CalendarRowBtnTxt}>Calendar</Text>
            </View>

            <View style={styles.rowBtn}>
              <TouchableOpacity style={styles.circleBtn}>
                <Feather name="plus" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.circleBtn}>
                <Feather name="search" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {/* calendar view */}
          <CalendarStrip
            scrollable={true} // Enable scrolling
            scrollerPaging={true} // Enable smooth paging when scrolling
            selectedDate={moment()} // Set the default selected date
            startingDate={moment().subtract(3, "days")} // Ensures scrolling range
            calendarHeaderPosition="above"
            style={styles.calendar}
            calendarHeaderStyle={{ fontSize: 18, color: "black" }}
            dateNumberStyle={{ fontSize: 16, color: "black" }}
            dateNameStyle={{ fontSize: 12, color: "gray" }}
            highlightDateNumberStyle={{
              color: "#FF1EAD",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: "800",
            }}
            highlightDateNameStyle={{
              color: "#FF1EAD",
              fontSize: 12,
              fontWeight: "800",
            }}
            datesWhitelist={datesWhitelist} // Use extended date range
          />

          {/* Training Program tiles */}
          <View style={styles.trainingCard}>
            {/* First Card */}
            <View style={styles.trainingCardOne}>
              <Text style={styles.trainingCardTxt}>Training Programs</Text>
              <View style={styles.trainingCount}>
                <Text style={styles.CardTxt}>25</Text>
                <Text style={styles.CardSubTxt}>Total</Text>
              </View>
              <View style={styles.CardBtn}>
                <View style={styles.btn}>
                  <Ionicons name="arrow-forward" size={24} color="black" />
                </View>
              </View>
            </View>

            {/* Second Tab */}
            <View style={styles.trainingCardtwo}>
              <Text style={styles.trainingCardTxt}>Training Programs</Text>
              <View style={styles.trainingCount}>
                <Text style={styles.CardTxt}>25</Text>
                <Text style={styles.CardSubTxt}>Total</Text>
              </View>
              <View style={styles.CardBtn}>
                <View style={styles.btn}>
                  <Ionicons name="arrow-forward" size={24} color="black" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 20,
    zIndex: 2,
  },
  calendar: {
    height: 120, // Increased height for better visibility
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderColor: "#FF1EAD",
    borderWidth: 2,
    paddingStart: 10,
    paddingEnd: 10,
    marginTop: 20,
  },
  backNavigation: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  backNavigationText: {
    fontSize: 20,
    fontWeight: "700",
  },
  CalendarRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  CalendarRowBtn: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#FFF0F2",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  CalendarRowBtnTxt: {
    fontSize: 16,
    fontWeight: "semibold",
  },

  rowBtn: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  circleBtn: {
    borderRadius: 20,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.25, // Shadow transparency
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5, // Elevation for Android
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  trainingCard: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  trainingCardOne: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#A36EF0",
    borderRadius: 10,
    marginTop: 20,
    width: "50%",
    height: 120,
  },

  trainingCardtwo: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#AEF7B4",
    borderRadius: 10,
    marginTop: 20,
    width: "50%",
    height: 120,
  },
  trainingCount: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  trainingCardTxt: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  CardTxt: {
    fontSize: 24,
    fontWeight: "800",
  },
  CardSubTxt: {
    fontSize: 16,
  },
  CardBtn: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btn: {
    display: "flex",
    flexDirection: "column",
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 20,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adjust values as needed
    justifyContent: "center",
    alignItems: "center",
  },
});

export default myTraining;
