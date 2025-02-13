import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

function register() {
    const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to Register" onPress={() => router.push("/")} />
    </View>
  );
}

export default register;
