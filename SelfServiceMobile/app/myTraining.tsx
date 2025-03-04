import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "@/components/ui/appBar";

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
      <SafeAreaView>
        {/* App Bar */}
        <AppBar menuOpen={menuOpen} toggleMenu={toggleMenu} />

        <View style={styles.container}>

            {/* back navigation */}
            <View style={styles.backNavigation}>
                <TouchableOpacity>
                    
                </TouchableOpacity>
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
        </View>
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 60,
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
  backNavigation:{
    display:'flex',
    flexDirection:'row',
    gap:5,
  },
});

export default myTraining;
