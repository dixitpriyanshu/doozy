import { Link } from "expo-router";

import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function IntroScreen() {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>
          The onle Task Manager app you'll ever need
        </Text>
      </View>
      <View style={styles.buttons}>
        <Link
          href={"/(auth)/signup"}
          style={[styles.button, { flex: 1, backgroundColor: Colors.dark }]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "500" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/(auth)/login"}
          style={[styles.button, { flex: 1, backgroundColor: "#fff" }]}
          asChild
        >
          <TouchableOpacity>
            <Text
              style={{ color: Colors.dark, fontSize: 22, fontWeight: "500" }}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  header: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#fff",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
