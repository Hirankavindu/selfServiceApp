import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import * as SecureStore from "expo-secure-store"; // For storing auth token

const LoginScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  // Function to handle login
  const handleLogin = async () => {
    // Basic validation
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Username and password are required");
      return;
    }

    setLoading(true);

    try {
      // Make API call to login endpoint
      const response = await fetch(
        "http://216.55.186.115:8040/HRMSystem/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            password: password, // Note: In production, you'd want to use a proper encryption method
          }),
        }
      );

      const data = await response.json();

      // Check if login was successful (assuming a successful login returns userId)
      if (data && data.userId) {
        // Store user data in secure storage
        await SecureStore.setItemAsync(
          "userData",
          JSON.stringify({
            userId: data.userId,
            userName: data.userName,
            userLevelId: data.userLevelId,
            userLevelDesc: data.userLevelDesc,
            empId: data.empId,
            empFirstname: data.empFirstname,
            empOtherName: data.empOtherName,
            // Store other relevant user data as needed
          })
        );

        // Navigate to main app
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "tabs" }],
          })
        );
      } else {
        // Handle login failure
        Alert.alert("Login Failed", "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Error",
        "Could not connect to the server. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* App Logo */}
        <Image
          source={require("../assets/images/appImage1.png")}
          style={styles.image}
        />

        {/* Login Text */}
        <Text style={styles.mainText}>Login</Text>

        {/* Username Input */}
        <TextInput
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          left={<TextInput.Icon icon="account" />}
          underlineColor="transparent"
          style={styles.input}
          autoCapitalize="none"
        />

        {/* Password Input */}
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={secureText}
          left={<TextInput.Icon icon="lock" />}
          underlineColor="transparent"
          right={
            <TextInput.Icon
              icon={secureText ? "eye-off" : "eye"}
              onPress={() => setSecureText(!secureText)}
            />
          }
          style={styles.input}
        />

        {/* Forgot Password */}
        <View style={styles.forgotBtn}>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <Button
          mode="contained"
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" size="small" /> : "Login"}
        </Button>

        {/* OR Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.divider} />
        </View>

        {/* Google Login */}
        <Button
          mode="outlined"
          icon="google"
          style={styles.googleButton}
          disabled={loading}
        >
          Login with Google
        </Button>

        {/* Register Link */}
        <View style={styles.accountBtn}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  mainText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#F7F7F7",
  },
  forgotText: {
    alignSelf: "flex-end",
    color: "#FF647F",
    fontSize: 14,
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#FF647F",
    paddingVertical: 5,
    borderRadius: 5,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#999",
  },
  googleButton: {
    width: "100%",
    backgroundColor: "#F7F7F7",
    borderColor: "#ddd",
    paddingVertical: 5,
  },
  registerText: {
    fontSize: 14,
    marginTop: 20,
  },
  registerLink: {
    color: "#FF647F",
    fontWeight: "bold",
  },
  forgotBtn: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  accountBtn: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 24,
  },
});
