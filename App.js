import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Button, FlatList, StyleSheet, Picker } from "react-native";

export default function App() {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("Starter");
  const [price, setPrice] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const courses = ["Starter", "Main", "Dessert"];

  const addMenuItem = () => {
    if (!dishName || !description || !price) {
      alert("Please fill in all fields");
      return;
    }

    const newItem = {
      id: Math.random().toString(),
      dishName,
      description,
      course,
      price
    };

    setMenuItems([...menuItems, newItem]);

    // Reset form
    setDishName("Soup");
    setDescription("Delicious soup served with soft hot buns");
    setCourse("Starter");
    setPrice("R80");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Christoffel's Kitchen </Text>

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

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Course:</Text>
          <Picker
            selectedValue={course}
            style={styles.picker}
            onValueChange={(itemValue) => setCourse(itemValue)}
          >
            {courses.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <Button title="Add Menu Item" onPress={addMenuItem} />
      </View>

      <View style={styles.menuList}>
        <Text style={styles.count}>Total Items: {menuItems.length}</Text>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.dishName}>{item.dishName} ({item.course})</Text>
              <Text>{item.description}</Text>
              <Text>Price: ${item.price}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  form: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  pickerContainer: { marginBottom: 10 },
  label: { fontSize: 16, marginBottom: 5 },
  picker: { height: 50, width: "100%" },
  menuList: { flex: 1 },
  count: { fontSize: 18, marginBottom: 10 },
  menuItem: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
  dishName: { fontWeight: "bold", fontSize: 16 }
});
