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
import AppBar from "@/components/ui/appBar";

type DropdownCardProps = {
  name: string;
  template: string;
  type: string;
  cycle: string;
  duration: string;
  remarks: string;
  score: string;
  complete: string;
};

const DropdownCard = ({
  name,
  template,
  type,
  cycle,
  duration,
  remarks,
  score,
  complete,
}: DropdownCardProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.dropdownCard}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.dropdownHeader}>
          <Text style={styles.dropdownName}>{name}</Text>
          <Text style={styles.dropdownTemplate}>{template}</Text>
          <Text style={styles.dropdownIcon}>{expanded ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.dropdownDetails}>
          <Text>Type: {type}</Text>
          <Text>Cycle: {cycle}</Text>
          <Text>Duration: {duration}</Text>
          <Text>Remarks: {remarks}</Text>
          <Text>Score: {score}</Text>
          <Text>Complete: {complete}</Text>
          <Text style={styles.viewScore}>View Score</Text>
        </View>
      )}
    </View>
  );
};

const performance = () => {
  const [activeTab, setActiveTab] = useState("Completed");
   const [menuOpen, setMenuOpen] = useState(false);
    
      const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
      };

  const completedData = [
    {
      name: "Samson Anderson",
      template: "Template Name",
      type: "Type",
      cycle: "Cycle",
      duration: "12/02/2025 - 20/02/2025",
      remarks: "Lorem ipsum dolor sit amet consectetur.",
      score: "N/A",
      complete: "Yes",
    },

    {
      name: "Samson Anderson",
      template: "Template Name",
      type: "Type",
      cycle: "Cycle",
      duration: "12/02/2025 - 20/02/2025",
      remarks: "Lorem ipsum dolor sit amet consectetur.",
      score: "N/A",
      complete: "Yes",
    },
  ];

  const ongoingData = [
    {
      name: "Ann Silvester",
      template: "Template Name",
      type: "Type",
      cycle: "Cycle",
      duration: "12/02/2025 - 20/02/2025",
      remarks: "Lorem ipsum dolor sit amet consectetur.",
      score: "N/A",
      complete: "No",
    },

    {
      name: "Ann Silvester",
      template: "Template Name",
      type: "Type",
      cycle: "Cycle",
      duration: "12/02/2025 - 20/02/2025",
      remarks: "Lorem ipsum dolor sit amet consectetur.",
      score: "N/A",
      complete: "No",
    },
  ];

  const dueData = [
    {
      name: "John Doe",
      template: "Template Name",
      type: "Type",
      cycle: "Cycle",
      duration: "12/02/2025 - 20/02/2025",
      remarks: "Lorem ipsum dolor sit amet consectetur.",
      score: "N/A",
      complete: "No",
    },

    {
      name: "John Doe",
      template: "Template Name",
      type: "Type",
      cycle: "Cycle",
      duration: "12/02/2025 - 20/02/2025",
      remarks: "Lorem ipsum dolor sit amet consectetur.",
      score: "N/A",
      complete: "No",
    },
  ];

  const renderCards = () => {
    let data: DropdownCardProps[] = []; // Specify the type here

    if (activeTab === "Completed") {
      data = completedData;
    } else if (activeTab === "Ongoing") {
      data = ongoingData;
    } else if (activeTab === "Due") {
      data = dueData;
    }

    return data.map((item, index) => (
      <DropdownCard
        key={index}
        name={item.name}
        template={item.template}
        type={item.type}
        cycle={item.cycle}
        duration={item.duration}
        remarks={item.remarks}
        score={item.score}
        complete={item.complete}
      />
    ));
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
          {/* Tab Buttons */}
          <View style={styles.tabBtn}>
            <TouchableOpacity onPress={() => setActiveTab("Completed")}>
              <View style={styles.tabBtn1}>
                <View
                  style={[
                    styles.dotBtn,
                    activeTab === "Completed" && styles.activeDot,
                  ]}
                />
                <Text
                  style={[
                    styles.dotBtnText,
                    activeTab === "Completed" && styles.activeText,
                  ]}
                >
                  Completed
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveTab("Ongoing")}>
              <View style={styles.tabBtn1}>
                <View
                  style={[
                    styles.dotBtn1,
                    activeTab === "Ongoing" && styles.activeDot,
                  ]}
                />
                <Text
                  style={[
                    styles.dotBtnText1,
                    activeTab === "Ongoing" && styles.activeText,
                  ]}
                >
                  Ongoing
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveTab("Due")}>
              <View style={styles.tabBtn1}>
                <View
                  style={[
                    styles.dotBtn2,
                    activeTab === "Due" && styles.activeDot,
                  ]}
                />
                <Text
                  style={[
                    styles.dotBtnText2,
                    activeTab === "Due" && styles.activeText,
                  ]}
                >
                  Due
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Expanded List */}
          {/* Expanded List */}
          <View style={styles.expandedList}>{renderCards()}</View>
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
  expandedList: {
    marginTop: 20,
  },
  dropdownCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownName: {
    fontWeight: "bold",
    fontSize: 16,
  },

  dropdownTemplate: {
    color: "gray",
  },

  dropdownIcon: {
    fontSize: 18,
  },

  dropdownDetails: {
    marginTop: 10,
  },

  viewScore: {
    color: "red",
    marginTop: 10,
  },
  activeDot: {
    borderWidth: 2,
    borderColor: "#000",
  },

  activeText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
