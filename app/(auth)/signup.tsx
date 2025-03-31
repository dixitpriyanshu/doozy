import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { StorageKeys, storeData } from "@/store";
import { router } from "expo-router";

import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default function SignUpScreen() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const signup = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://doozy-backend.vercel.app/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      if (response.status !== 200) {
        alert(data.message);
        setLoading(false);
        return;
      }
      storeData(StorageKeys.JWT, data.token);
      router.dismissAll();
      router.replace("/(authenticated)");
    } catch (error) {
      console.error("Sign up Error:", error);
    }
    setLoading(false);
  }, [email, password, username]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>
          Create an account to get started
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input]}
            placeholder="Enter you Full Name"
            placeholderTextColor={Colors.gray}
            keyboardType="default"
            value={username}
            onChangeText={setUserName}
          />
          <TextInput
            style={[styles.input]}
            placeholder="Enter you Email"
            placeholderTextColor={Colors.gray}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter you Password"
              placeholderTextColor={Colors.gray}
              keyboardType="visible-password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ padding: 10 }}
            >
              <IconSymbol
                name={showPassword ? "eye.slash" : "eye"}
                size={32}
                color={showPassword ? Colors.gray : Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            styles.button,
            email === "" ||
            !validateEmail(email) ||
            password.length < 5 ||
            username === "" ||
            loading
              ? styles.disabled
              : styles.enabled,
            { marginBottom: 20 },
          ]}
          onPress={signup}
          disabled={
            email === "" ||
            !validateEmail(email) ||
            !password ||
            password.length < 5 ||
            username === "" ||
            loading
          }
        >
          {!loading ? (
            <Text style={styles.buttonText}>Continue</Text>
          ) : (
            <ActivityIndicator color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    gap: 20,
    flexDirection: "column",
  },
  input: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  button: {
    padding: 10,
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
