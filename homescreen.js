// homescreen.js

import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

// Change signature to receive menuItems and the new menuStats prop
export default function HomeScreen({ navigation, menuItems, menuStats }) { 
  
  // Helper to find average price by course from the pre-calculated stats
  const getAveragePrice = (course) => {
    const stat = menuStats.stats.find(s => s.course === course);
    return stat ? stat.avgPrice : 'N/A';
  };
  
  // Find the total number of items to display (Requirement 4 in oil2.jpg)
  const totalItems = menuStats.totalItems;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Christoffel's Kitchen</Text>

      {/* REQUIREMENT 1: Display the average price of the menu items broken down */}
      <View style={styles.averageContainer}>
        <Text style={styles.averageTitle}>Average Prices by Course</Text>
        <Text style={styles.averageText}>Starter: {getAveragePrice("Starter")}</Text>
        <Text style={styles.averageText}>Main: {getAveragePrice("Main")}</Text>
        <Text style={styles.averageText}>Dessert: {getAveragePrice("Dessert")}</Text>
      </View>
      
      {/* REQUIREMENT 4 (oil2.jpg): Display the total number of menu items */}
      <Text style={styles.subtitle}>Full Menu ({totalItems} items):</Text>

      {/* REQUIREMENT 3 (oil2.jpg): The home screen must display the menu that the chef has prepared. */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>
              {item.dishName} ({item.course})
            </Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>R{item.price}</Text>
          </View>
        )}
      />

      <View style={styles.buttonRow}>
        {/* REQUIREMENT 2: Navigate to separate screen for adding/removing items */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Manage Menu")}
        >
          <Text style={styles.buttonText}>Manage Menu</Text>
        </TouchableOpacity>

        {/* Guest can navigate to the filter page */}
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Guest Filter")}
        >
          <Text style={styles.buttonText}>Guest Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E6F0FA", padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#005A9C",
    textAlign: "center",
    marginBottom: 20,
  },
  averageContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  averageTitle: { fontWeight: "bold", color: "#005A9C", marginBottom: 5 },
  averageText: { color: "#333" },
  subtitle: { fontSize: 20, color: "#005A9C", fontWeight: "bold", marginBottom: 10 },
  menuItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  dishName: { fontSize: 18, fontWeight: "bold", color: "#005A9C" },
  price: { color: "#0073E6", fontWeight: "600" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  button: {
    flex: 1,
    backgroundColor: "#005A9C",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: "#0073E6",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
