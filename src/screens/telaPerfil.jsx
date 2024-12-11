import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/contextoAutenticacao";

const UserProfileScreen = () => {
  const { user, logout } = useAuth();
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions.addEventListener("change", updateOrientation);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1E1E1E",
      padding: orientation === "landscape" ? 10 : 20,
    },
    header: {
      alignItems: "center",
      marginBottom: 25,
    },
    profileImage: {
      width: orientation === "landscape" ? 100 : 140,
      height: orientation === "landscape" ? 100 : 140,
      borderRadius: 70,
      borderWidth: 4,
      borderColor: "#FFD700",
      marginBottom: 15,
    },
    name: {
      fontSize: orientation === "landscape" ? 20 : 26,
      color: "#FFD700",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1.5,
    },
    username: {
      fontSize: orientation === "landscape" ? 14 : 18,
      color: "#AAAAAA",
      marginBottom: 10,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      paddingHorizontal: 30,
    },
    statItem: {
      alignItems: "center",
    },
    statValue: {
      fontSize: orientation === "landscape" ? 16 : 20,
      color: "#FFD700",
      fontWeight: "bold",
    },
    statLabel: {
      fontSize: orientation === "landscape" ? 12 : 14,
      color: "#AAAAAA",
    },
    logoutButton: {
      backgroundColor: "#333333",
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 10,
      marginTop: 30,
      alignSelf: "center",
      borderWidth: 3,
      borderColor: "#FFD700",
    },
    logoutText: {
      color: "#FFD700",
      textAlign: "center",
      fontSize: orientation === "landscape" ? 14 : 18,
      fontWeight: "bold",
    },
  });

  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar_url }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name || user.login}</Text>
        <Text style={styles.username}>@{user.login}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.public_repos}</Text>
          <Text style={styles.statLabel}>Repositórios</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.followers}</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.following}</Text>
          <Text style={styles.statLabel}>Seguindo</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserProfileScreen;
