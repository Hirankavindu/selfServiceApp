// Updated SignIn component using the API service
import React, { useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";
import { apiService } from "../service/api.service";

export default function SignIn() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  // Function to encrypt password using MD5
  const encryptPassword = (plainPassword: string): string | null => {
    try {
      const hash = CryptoJS.MD5(plainPassword);
      const encryptedPassword = hash.toString(CryptoJS.enc.Hex);
      return encryptedPassword;
    } catch (error) {
      console.error("Encryption error:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Username and password are required");
      return;
    }

    setLoading(true);

    try {
      // Encrypt the password
      const encryptedPassword = encryptPassword(password);

      if (!encryptedPassword) {
        Alert.alert("Error", "Password encryption failed");
        setLoading(false);
        return;
      }

      console.log("Original Password:", password);
      console.log("Encrypted Password (MD5):", encryptedPassword);

      // Use the API service for login
      const data = await apiService.login({
        userName: username,
        password: encryptedPassword,
      });

      if (data && data.userId) {
        console.log("Login successful for user:", data.userId);

        // Store login data
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("userData", JSON.stringify(data));

        // Navigate to main app
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "tabs" }],
          })
        );
      } else {
        console.log("Login failed - No userId in response");
        Alert.alert("Login Failed", "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Error",
        "Could not connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/appImage1.png")}
          style={styles.image}
        />

        <Text style={styles.mainText}>Login</Text>

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          left={<TextInput.Icon icon="account" />}
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={secureText ? "eye-off" : "eye"}
              onPress={() => setSecureText(!secureText)}
            />
          }
          style={styles.input}
        />

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : "Login"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  image: { width: 200, height: 200, marginBottom: 20 },
  mainText: { fontSize: 30, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", marginBottom: 10, backgroundColor: "#F7F7F7" },
  forgotBtn: { width: "100%", alignItems: "flex-end" },
  forgotText: { color: "#FF647F", fontSize: 14, marginBottom: 20 },
  loginButton: { width: "100%", backgroundColor: "#FF647F", borderRadius: 5 },
});
