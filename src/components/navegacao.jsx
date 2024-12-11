import React from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomNavigation = ({ state, descriptors, navigation }) => {
  const routesToIgnore = ["RepositoryDetails", "IssueDetails"];
  const routes = state.routes.filter(
    (route) => !routesToIgnore.includes(route.name)
  );

  return (
    <View style={styles.container}>
      {routes.map((route) => {
        const index = state.routes.findIndex((r) => r.name === route.name);
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIconName = (routeName) => {
          switch (routeName) {
            case "Repositories":
              return isFocused ? "code-slash" : "code-slash-outline";
            case "Profile":
              return isFocused ? "person" : "person-outline";
            case "CreateIssue":
              return isFocused ? "add-circle" : "add-circle-outline";
            case "Issues":
              return isFocused
                ? "information-circle"
                : "information-circle-outline";
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[
              styles.tab,
              isFocused && styles.tabFocused,
            ]}
          >
            <Ionicons
              name={getIconName(route.name)}
              size={28}
              color={isFocused ? "#FFD700" : "#AAAAAA"}
            />
            <Animated.Text
              style={[
                styles.label,
                isFocused ? styles.labelFocused : styles.labelUnfocused,
              ]}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    height: 70,
    borderTopWidth: 2,
    borderTopColor: "#FFD700",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabFocused: {
    borderBottomWidth: 3,
    borderBottomColor: "#FFD700",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  labelFocused: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  labelUnfocused: {
    color: "#AAAAAA",
  },
});

export default BottomNavigation;