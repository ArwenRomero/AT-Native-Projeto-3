import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RepositoryItem = ({ repo, onPress }) => {
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
      padding: orientation === "landscape" ? 10 : 15,
      backgroundColor: "#f5f5f5",
    },
    repoItem: {
      backgroundColor: "#ffffff",
      padding: 20,
      marginVertical: 10,
      borderRadius: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    repoName: {
      fontSize: orientation === "landscape" ? 18 : 22,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 8,
    },
    repoDescription: {
      fontSize: orientation === "landscape" ? 14 : 16,
      color: "#666",
      marginBottom: 12,
      lineHeight: 22,
    },
    repoStats: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statText: {
      fontSize: orientation === "landscape" ? 14 : 16,
      color: "#555",
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 5,
      fontSize: orientation === "landscape" ? 16 : 18,
      color: "#f39c12",
    },
  });

  return (
    <TouchableOpacity style={styles.repoItem} onPress={() => onPress(repo)}>
      <Text style={styles.repoName}>{repo.name}</Text>
      <Text style={styles.repoDescription} numberOfLines={2}>
        {repo.description || "Sem descrição"}
      </Text>
      <View style={styles.repoStats}>
        <Text style={styles.statText}>
          <FontAwesome name="star" style={styles.icon} />
          {repo.stargazers_count}
        </Text>
        <Text style={styles.statText}>
          <FontAwesome name="fork" style={styles.icon} />
          {repo.forks_count}
        </Text>
        <Text style={styles.statText}>
          <FontAwesome name="code" style={styles.icon} />
          {repo.language || "N/A"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RepositoryItem;
