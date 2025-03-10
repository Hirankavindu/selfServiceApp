import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-date-picker";
import { TextInput, Button } from "react-native-paper";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useRouter } from "expo-router";
import AppBar from "@/components/ui/appBar";

const LeaveAdd = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
   const [menuOpen, setMenuOpen] = useState(false);
    
      const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
      };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        {/* App Bar */}
        <AppBar menuOpen={menuOpen} toggleMenu={toggleMenu} />

        {/* Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Dashboard text */}
            <Text style={styles.dashboardText}>Leave</Text>
            <Text style={styles.dashboardSubText}>Apply for leave below</Text>

            {/* Input Section */}
            <View style={styles.TextInputArea}>
              <View>
                <Text style={styles.LabelText}>Leave Type</Text>
                {/* Dropdowns */}
                <RNPickerSelect
                  onValueChange={(value) => setSelectedType(value)}
                  items={[
                    { label: "Sick Leave", value: "sick" },
                    { label: "Casual Leave", value: "casual" },
                    { label: "Annual Leave", value: "annual" },
                  ]}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Select Leave Type", value: null }}
                />
              </View>

              <View>
                <Text style={styles.LabelText}>Leave Duration</Text>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedDuration(value)}
                  items={[
                    { label: "Half Day", value: "half" },
                    { label: "Full Day", value: "full" },
                    { label: "Multiple Days", value: "multiple" },
                  ]}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Select Duration", value: null }}
                />
              </View>

              <View>
                <Text style={styles.LabelText}>Leave Reason Type</Text>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedReason(value)}
                  items={[
                    { label: "Personal", value: "personal" },
                    { label: "Medical", value: "medical" },
                    { label: "Family", value: "family" },
                  ]}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Select Reason", value: null }}
                />
              </View>

              <View>
                <Text style={styles.LabelText}>Leave Date</Text>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedReason(value)}
                  items={[
                    { label: "01", value: "1" },
                    { label: "02", value: "2" },
                    { label: "03", value: "3" },
                  ]}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Select Date", value: null }}
                />
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
                  Apply
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default LeaveAdd;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appBar: {
    height: 60,
    backgroundColor: "#FFC31E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    padding: 10,
  },
  dashboardText: {
    fontSize: 24,
    fontWeight: "700",
    paddingTop:10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  dashboardSubText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  datePickerButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#FF1EAD",
    borderRadius: 8,
    alignItems: "center",
  },
  datePickerText: {
    color: "#fff",
    fontSize: 16,
  },

  TextInputArea: {
    gap: 14,
    marginTop: 30,
  },
  LabelText: {
    fontSize: 16,
    paddingBottom: 10,
  },
    loginButton: {
    width: "100%",
    backgroundColor: "#FF647F",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop:40,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EAECEF", // Light border color
    borderRadius: 10, // Rounded corners
    backgroundColor: "#F7F8FA", // Light background color
    color: "#333", // Text color
  },
  inputAndroid: {
    fontSize: 16,
    paddinginline: 12,
    borderWidth: 1,
    borderColor: "#EAECEF",
    borderRadius: 10,
    backgroundColor: "#F7F8FA",
    color: "#333",
  },
  placeholder: {
    color: "#999", // Placeholder text color
  },
};
