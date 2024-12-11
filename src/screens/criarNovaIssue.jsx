import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/contextoAutenticacao";
import GitHubService from "../api/API";

const CreateIssueScreen = ({ navigation, route }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [repository, setRepository] = useState("");
  const [loading, setLoading] = useState(false);

  const githubService = new GitHubService(token);

  const handleCreateIssue = async () => {
    if (!title.trim() || !repository.trim()) {
      Alert.alert("Erro", "Título e repositório são obrigatórios");
      return;
    }

    setLoading(true);
    try {
      const [owner, repo] = repository.split("/");
      await githubService.createIssue(owner, repo, { title, body });

      Alert.alert("Sucesso", "Issue criada com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Nova Issue</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Repositório (owner/repo)</Text>
        <View style={styles.inputGroup}>
          <Ionicons name="logo-github" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={repository}
            onChangeText={setRepository}
            placeholder="Ex: ArwenRomero/At-Native"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Título da Issue</Text>
        <View style={styles.inputGroup}>
          <Ionicons name="document-text" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título da issue"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição (opcional)</Text>
        <View style={styles.inputGroup}>
          <Ionicons name="create" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={4}
            placeholder="Descrição detalhada da issue"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCreateIssue}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Criando..." : "Criar Issue"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFD700",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#FFFFFF",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderWidth: 1,
    borderColor: "#3C3C3C",
    borderRadius: 5,
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#FFFFFF",
    paddingLeft: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
    color: "#FFD700",
  },
  button: {
    backgroundColor: "#4078c0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateIssueScreen;
