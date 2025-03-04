import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Button } from "react-native-paper";
import AppBar from "@/components/ui/appBar";

const profileDetailsEdit = () => {
  const [activeSection, setActiveSection] = useState("Personal");
  const [menuOpen, setMenuOpen] = useState(false);
      
        const toggleMenu = () => {
          setMenuOpen((prev) => !prev);
        };

  // Function to render relevant input fields
  const renderInputFields = () => {
    switch (activeSection) {
      case "Personal":
        return (
          <>
            <TextInput style={styles.input} placeholder="Title" />
            <TextInput style={styles.input} placeholder="Initials" />
            <TextInput style={styles.input} placeholder="Last Name" />
            <TextInput style={styles.input} placeholder="Full Name" />
            <TextInput style={styles.input} placeholder="DOB" />
            <TextInput style={styles.input} placeholder="Gender" />
            <TextInput style={styles.input} placeholder="Nationality" />
            <TextInput style={styles.input} placeholder="Religion" />
            <TextInput style={styles.input} placeholder="Blood Group" />
            <TextInput style={styles.input} placeholder="Marital Status" />
          </>
        );
      case "Contact":
        return (
          <>
            <TextInput style={styles.input} placeholder="Phone Number" />
            <TextInput style={styles.input} placeholder="Email Address" />
            <TextInput style={styles.input} placeholder="Address" />
            <TextInput style={styles.input} placeholder="City" />
            <TextInput style={styles.input} placeholder="Email Address" />
            <TextInput style={styles.input} placeholder="Address" />
            <TextInput style={styles.input} placeholder="City" />
          </>
        );
      case "Bank":
        return (
          <>
            <TextInput style={styles.input} placeholder="Bank Name" />
            <TextInput style={styles.input} placeholder="Account Number" />
            <TextInput style={styles.input} placeholder="IFSC Code" />
            <TextInput style={styles.input} placeholder="Branch" />
          </>
        );
      default:
        return null;
    }
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
          {/* Dashboard text */}
          {/* header row */}
          <View style={styles.HeaderRow}>
            {/* Dashboard text */}
            <Text style={styles.dashboardText}>My Profile Edit</Text>
            <TouchableOpacity>
              <Feather name="edit" size={24} color="#FF1EAD" />
            </TouchableOpacity>
          </View>
          {/* Row Buttons */}
          <View style={styles.rowBtn}>
            <TouchableOpacity onPress={() => setActiveSection("Personal")}>
              <Text
                style={[
                  styles.rowBtnTxt,
                  activeSection === "Personal" && styles.activeText,
                ]}
              >
                Personal Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveSection("Contact")}>
              <Text
                style={[
                  styles.rowBtnTxt,
                  activeSection === "Contact" && styles.activeText,
                ]}
              >
                Contact Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveSection("Bank")}>
              <Text
                style={[
                  styles.rowBtnTxt,
                  activeSection === "Bank" && styles.activeText,
                ]}
              >
                Bank Details
              </Text>
            </TouchableOpacity>
          </View>

          {/* Changed Content */}
          <View style={styles.inputRowSet}>{renderInputFields()}</View>

          <View>
            <Button mode="contained" style={styles.loginButton}>
              Save
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profileDetailsEdit;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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

  HeaderRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  scrollContainer: {
    paddingBottom: 20,
  },

  rowBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  rowBtnTxt: {
    fontSize: 16,
  },

  inputRowSet: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginTop: 20,
  },
  activeText: {
    color: "#007bff",
    borderBottomColor: "#007bff",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#FF647F",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 40,
  },
});
