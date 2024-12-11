import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useAuth } from "../context/contextoAutenticacao";
import GitHubService from "../api/API";
import RepositoryItem from "../components/cardRepositorio";

const RepositoriesScreen = ({ navigation }) => {
  const { token } = useAuth();
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [orientation, setOrientation] = useState("portrait");

  const githubService = new GitHubService(token);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions.addEventListener("change", updateOrientation);
  }, []);

  const fetchRepositories = async (pageToFetch, isRefresh = false) => {
    if (loading) return;

    setLoading(true);
    try {
      const { repositories } = await githubService.getRepositories(pageToFetch);

      setRepositories(prev =>
        isRefresh ? repositories : [...prev, ...repositories]
      );
      setPage(pageToFetch);
    } catch (error) {
      console.error("Erro ao buscar repositórios:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRepositories(1);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRepositories(1, true);
  }, []);

  const handleLoadMore = () => {
    fetchRepositories(page + 1);
  };

  const navigateToRepoDetails = repo => {
    navigation.navigate("RepositoryDetails", { repository: repo });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1E1E1E",
      padding: orientation === "landscape" ? 15 : 20,
      justifyContent: "center",
    },
    repoItem: {
      backgroundColor: "#2C2C2C",
      borderRadius: 8,
      marginVertical: 12,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
    repoName: {
      fontSize: orientation === "landscape" ? 18 : 22,
      fontWeight: "bold",
      color: "#FFD700",
      marginBottom: 8,
      letterSpacing: 1.2,
    },
    repoDescription: {
      fontSize: orientation === "landscape" ? 14 : 16,
      color: "#B0B0B0",
      lineHeight: 20,
      marginBottom: 12,
    },
    repoStats: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    repoStatText: {
      fontSize: orientation === "landscape" ? 12 : 14,
      color: "#AAAAAA",
    },
    loader: {
      padding: 20,
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={repositories}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <RepositoryItem repo={item} onPress={navigateToRepoDetails} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default RepositoriesScreen;
