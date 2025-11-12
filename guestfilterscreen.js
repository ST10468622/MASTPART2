// guestfilterscreen.js

import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";

// Change signature to receive menuItems prop directly
export default function GuestFilterScreen({ menuItems }) { 
  // FIX: Ensure menuItems is an array. route.params is no longer the main source.
  const items = menuItems || []; 
  const [selectedCourse, setSelectedCourse] = useState("All");

  // REQUIREMENT: Allows the guest to filter by course
  const filteredItems =
    selectedCourse === "All"
      ? items
      : items.filter((item) => item.course === selectedCourse);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Filter Menu by Course</Text>

      <Picker
        selectedValue={selectedCourse}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCourse(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        {/* REQUIREMENT: Predefined list of courses */}
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>
      
      <Text style={styles.subtitle}>Showing {filteredItems.length} items:</Text>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>R{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E6F0FA", padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#005A9C",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, color: "#005A9C", marginBottom: 10 },
  picker: { backgroundColor: "#fff", marginBottom: 15, height: 50 }, // Added height for Android
  menuItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  dishName: { fontSize: 18, fontWeight: "bold", color: "#005A9C" },
  price: { color: "#0073E6", fontWeight: "600" },
});
