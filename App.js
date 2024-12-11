import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/context/contextoAutenticacao";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StatusBar, Platform, StyleSheet } from "react-native";

import AuthScreen from "./src/screens/telaAutenticacao";
import UserProfileScreen from "./src/screens/telaPerfil";
import RepositoriesScreen from "./src/screens/telaRepo";
import IssuesScreen from "./src/screens/telaIssue";
import RepositoryDetailsScreen from "./src/screens/telaDetalhesRepo";
import IssueDetailsScreen from "./src/screens/telaDetalhesIssue";
import CreateIssueScreen from "./src/screens/criarNovaIssue";
import BottomNavigation from "./src/components/navegacao";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { isAuthenticated, restoreToken } = useAuth();

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: "#FFD700",
        headerTitleStyle: styles.headerTitle,
      }}
      tabBar={(props) => <BottomNavigation {...props} />}
    >
      {!isAuthenticated ? (
        <Tab.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: "Autenticação GitHub" }}
        />
      ) : (
        <>
          <Tab.Screen
            name="Profile"
            component={UserProfileScreen}
            options={{ title: "Perfil do Usuário" }}
          />
          <Tab.Screen
            name="Repositories"
            component={RepositoriesScreen}
            options={{ title: "Meus Repositórios" }}
          />
          <Tab.Screen
            name="Issues"
            component={IssuesScreen}
            options={{ title: "Minhas Issues" }}
          />
          <Tab.Screen
            name="RepositoryDetails"
            component={RepositoryDetailsScreen}
            options={{ title: "Detalhes do Repositório" }}
          />
          <Tab.Screen
            name="IssueDetails"
            component={IssueDetailsScreen}
            options={{ title: "Detalhes da Issue" }}
          />
          <Tab.Screen
            name="CreateIssue"
            component={CreateIssueScreen}
            options={{ title: "Criar Nova Issue" }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#1E1E1E" />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#1E1E1E",
  },
  header: {
    backgroundColor: "#333333",
    borderBottomWidth: 2,
    borderBottomColor: "#FFD700",
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#FFD700",
  },
});
