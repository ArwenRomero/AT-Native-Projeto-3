import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RepositoryDetailsScreen = ({ route }) => {
  const { repository } = route.params;
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions.addEventListener("change", updateOrientation);
    return () => {};
  }, []);

  const openRepository = () => {
    Linking.openURL(repository.html_url);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: orientation === "landscape" ? 15 : 25,
      backgroundColor: "#1E1E1E",
    },
    header: {
      backgroundColor: "#2C2C2C",
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    repoName: {
      fontSize: orientation === "landscape" ? 22 : 28,
      fontWeight: "bold",
      color: "#FFD700",
      marginBottom: 8,
    },
    description: {
      fontSize: orientation === "landscape" ? 16 : 18,
      color: "#B0B0B0",
      lineHeight: 24,
      marginBottom: 20,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    statBox: {
      backgroundColor: "#333333",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      width: "30%",
    },
    statLabel: {
      fontSize: orientation === "landscape" ? 14 : 16,
      color: "#A0A0A0",
      marginBottom: 5,
    },
    statValue: {
      fontSize: orientation === "landscape" ? 18 : 20,
      fontWeight: "bold",
      color: "#FFD700",
    },
    linkButton: {
      backgroundColor: "#4078c0",
      padding: 12,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    linkButtonText: {
      color: "white",
      marginLeft: 10,
      fontSize: orientation === "landscape" ? 16 : 18,
      fontWeight: "bold",
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.repoName}>{repository.name}</Text>
        <Text style={styles.description}>
          {repository.description || "Sem descrição"}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Stars</Text>
          <Text style={styles.statValue}>{repository.stargazers_count}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Forks</Text>
          <Text style={styles.statValue}>{repository.forks_count}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Linguagem</Text>
          <Text style={styles.statValue}>{repository.language || "N/A"}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.linkButton} onPress={openRepository}>
        <Ionicons name="open-outline" size={24} color="white" />
        <Text style={styles.linkButtonText}>Abrir no GitHub</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RepositoryDetailsScreen;
