import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useAuth } from "../context/contextoAutenticacao";

const AuthScreen = () => {
  const [token, setToken] = useState("");
  const { login } = useAuth();
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions.addEventListener("change", updateOrientation);
  }, []);

  const handleLogin = async () => {
    if (!token.trim()) {
      Alert.alert("Erro", "Por favor, insira um token do GitHub");
      return;
    }

    try {
      await login(token);
    } catch (error) {
      Alert.alert(
        "Erro de Autenticação",
        "Não foi possível autenticar. Verifique seu token."
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: orientation === "landscape" ? 20 : 40,
      backgroundColor: "#1E1E1E",
    },
    title: {
      fontSize: orientation === "landscape" ? 20 : 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: "#FFD700",
    },
    input: {
      height: orientation === "landscape" ? 40 : 50,
      borderColor: "#3C3C3C",
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 15,
      borderRadius: 5,
      backgroundColor: "#2C2C2C",
      color: "#FFFFFF",
      fontSize: 16,
    },
    button: {
      backgroundColor: "#4078c0",
      padding: orientation === "landscape" ? 10 : 15,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: orientation === "landscape" ? 16 : 18,
      fontWeight: "bold",
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Autenticação GitHub</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu token GitHub"
        value={token}
        onChangeText={setToken}
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="#AAAAAA"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
