import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput,Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

const LoginScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

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
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Button mode="contained" style={styles.loginButton}>
          Login
        </Button>

        {/* OR Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.divider} />
        </View>

        {/* Google Login */}
        <Button mode="outlined" icon="google" style={styles.googleButton}>
          Login with Google
        </Button>

        {/* Register Link */}
        <View style={styles.registerText}>
          <Text>Don’t have an account? </Text>
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
  borderRadius: 10, // Adds rounded corners
  overflow: "hidden", // Ensures proper clipping
  backgroundColor: "#F7F7F7", // Soft background for better visibility
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
});
