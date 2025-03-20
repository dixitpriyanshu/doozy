import Colors from "@/constants/Colors";
import { useSession } from "@/hooks/useSession";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack } from "expo-router";
import { ActivityIndicator, TouchableOpacity } from "react-native";

export default function AuthLayout() {
  const session = useSession();
  if (session === undefined) return <ActivityIndicator />;
  if (session) return <Redirect href="/(authenticated)" />;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
