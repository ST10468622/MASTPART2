// managemenuscreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert, // Use Alert for animation feedback (Requirement 2, oil.jpg)
} from "react-native";
import { Picker } from "@react-native-picker/picker";

// Change signature to receive setMenuItems
export default function ManageMenuScreen({ menuItems, setMenuItems }) {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("Starter");
  const [price, setPrice] = useState("");

  // REQUIREMENT 2: Predefined list of courses
  const courses = ["Starter", "Main", "Dessert"];

  const addMenuItem = () => {
    const parsedPrice = parseFloat(price);
    
    // REQUIREMENT: Use an if statement to solve programming problems (validation)
    if (!dishName || !description || isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }
    
    // REQUIREMENT 1: Dish name, Description, Course, Price entered by chef (oil.jpg)
    const newItem = {
      id: Math.random().toString(),
      dishName,
      description,
      course,
      price: parsedPrice.toFixed(2), // Store as string with 2 decimals
    };
    
    // REQUIREMENT 3: Save to array (via setMenuItems)
    setMenuItems((prevItems) => [...prevItems, newItem]);
    
    // REQUIREMENT: Apply animations (Alert is simple feedback)
    Alert.alert("Added!", `${dishName} added to menu.`);

    // Clear form
    setDishName("");
    setDescription("");
    setCourse("Starter");
    setPrice("");
  };

  // REQUIREMENT 3: Add a way for the chef to remove items
  const removeMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    Alert.alert("Removed!", "Item successfully removed."); // Animation feedback
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Menu Items</Text>

      {/* Adding Menu Items */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={dishName}
          onChangeText={setDishName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        {/* Course selection based on predefined list */}
        <Picker
          selectedValue={course}
          style={styles.picker}
          onValueChange={(value) => setCourse(value)}
        >
          {courses.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Price (R)"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
          <Text style={styles.addButtonText}>Add Menu Item</Text>
        </TouchableOpacity>
      </View>
      
      {/* Removing Menu Items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemText}>
              {item.dishName} ({item.course}) - R{item.price}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeMenuItem(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E6F0FA", padding: 20 },
  title: {
    fontSize: 24,
    color: "#005A9C",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#B3D4FC",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#F7FBFF",
  },
  picker: { backgroundColor: "#F7FBFF", marginBottom: 10, height: 50 }, // Added height for Android
  addButton: {
    backgroundColor: "#005A9C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  menuItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemText: { color: "#005A9C", fontWeight: "bold" },
  removeButton: {
    backgroundColor: "#FF5C5C",
    padding: 6,
    borderRadius: 6,
  },
  removeButtonText: { color: "#fff" },
});
