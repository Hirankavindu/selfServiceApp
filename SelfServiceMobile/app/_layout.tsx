// app/_layout.tsx

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import Dashboard from "./dashboard";
import Register from "./register";
import SignIn from "./index"; // This is now AuthLoading
import { MaterialIcons } from "@expo/vector-icons";
import leavePage from "./leavePage";
import leaveAdd from "./leaveAdd";
import performance from "./performance";
import profile from "./profile";
import profileDetails from "./profileDetails";
import profileDetailsEdit from "./profileDetailsEdit";
import myTraining from "./myTraining";
import myTrainingEdit from "./myTrainingEdit";
import AuthLoading from "./AuthLoading";
 // Ensure this is imported

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof MaterialIcons.glyphMap> = {
            Dashboard: "home",
            Leave: "person-add",
            Performance: "add-chart",
            Profile: "person",
          };
          return (
            <MaterialIcons
              name={icons[route.name] as keyof typeof MaterialIcons.glyphMap}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Leave" component={leavePage} />
      <Tab.Screen name="Performance" component={performance} />
      <Tab.Screen name="Profile" component={profile} />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Start by checking login */}
        <Stack.Screen name="AuthLoading" component={AuthLoading} />
        {/* Shown when not logged in */}
        <Stack.Screen name="register" component={Register} />
        {/* Shown when logged in */}
        <Stack.Screen name="tabs" component={TabNavigator} />
        <Stack.Screen name="leaveAdd" component={leaveAdd} />
        <Stack.Screen name="profileDetails" component={profileDetails} />
        <Stack.Screen
          name="profileDetailsEdit"
          component={profileDetailsEdit}
        />
        <Stack.Screen name="myTraining" component={myTraining} />
        <Stack.Screen name="myTrainingEdit" component={myTrainingEdit} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
