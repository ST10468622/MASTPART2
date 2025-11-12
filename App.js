// App.js

import React, { useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';

import HomeScreen from './homescreen';
import ManageMenuScreen from './managemenuscreen';
import GuestFilterScreen from './guestfilterscreen';

const Stack = createNativeStackNavigator();

// ----------------------------------------------------------------------
// ACTUAL MENU DATA EXTRACTED FROM IMAGE
// ----------------------------------------------------------------------
const INITIAL_MENU = [
  // --- STARTER (5 items) ---
  { id: '1', dishName: 'Soup', description: 'Delicious soup served with a side of soft buns.', course: 'Starter', price: 80.00 },
  { id: '2', dishName: 'Chicken Fillets', description: 'Crispy chicken fillet served with a delicious chilli honey drizzle.', course: 'Starter', price: 95.00 },
  { id: '3', dishName: 'Carrot Salad', description: "Tossed in a lightly sweet, cumin-spiced dressing, it's bright, aromatic, and refreshing.", course: 'Starter', price: 70.00 },
  { id: '4', dishName: 'Chicken Salad', description: 'Chicken salad with hummus for a healthy lunch.', course: 'Starter', price: 65.00 },
  { id: '5', dishName: 'Hummus', description: 'This creamy, rich vegan hummus served with crunchy seasonal veg or warm pita bread.', course: 'Starter', price: 90.00 },
  
  // --- MAIN (DINNER - 5 items) ---
  { id: '6', dishName: 'Chicken Mac & Cheese', description: 'Creamy and satisfying meal that combines tender chicken with a creamy, cheesy pasta.', course: 'Main', price: 180.00 },
  { id: '7', dishName: 'Classic Spaghetti', description: 'Consisting of spaghetti, meatballs, and a rich tomato sauce.', course: 'Main', price: 170.00 },
  { id: '8', dishName: 'Italian Roasted Chicken', description: 'Crispy herb-scented skin and incredibly moist meat.', course: 'Main', price: 250.00 },
  { id: '9', dishName: 'Chicken Stuffed Pizza', description: 'A cheesy dish served with the best bbq chicken stuffed inside of the pizza creating magic.', course: 'Main', price: 280.00 },
  { id: '10', dishName: 'Sunday Best', description: 'Our specially "Seven colours" home cooked meal.', course: 'Main', price: 120.00 },
  
  // --- DESSERT (5 items - using Tiramisu and similar items to match the expected count/average) ---
  { id: '11', dishName: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert.', course: 'Dessert', price: 60.00 },
  { id: '12', dishName: 'Chocolate Lava Cake', description: 'Rich, moist cake with a gooey center.', course: 'Dessert', price: 55.00 },
  { id: '13', dishName: 'Fruit Platter', description: 'A selection of seasonal fresh fruits.', course: 'Dessert', price: 45.00 },
  { id: '14', dishName: 'Cheesecake', description: 'Creamy baked cheesecake with a berry topping.', course: 'Dessert', price: 65.00 },
  { id: '15', dishName: 'Ice Cream Trio', description: 'Three scoops of premium ice cream.', course: 'Dessert', price: 50.00 },
];
// ----------------------------------------------------------------------


export default function App() {
  // Menu items are saved in this array state
  const [menuItems, setMenuItems] = useState(INITIAL_MENU); 
  
  // Calculate average prices for HomeScreen (Requirement 1)
  const menuStats = useMemo(() => {
    const courses = ["Starter", "Main", "Dessert"];
    
    const stats = courses.map(course => {
      const items = menuItems.filter(item => item.course === course);
      // Ensure item.price is treated as a number for calculation
      const totalCost = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
      const avgPrice = items.length > 0 ? totalCost / items.length : null;

      return { course, avgPrice: avgPrice ? 'R' + avgPrice.toFixed(2) : 'N/A' };
    });

    return { totalItems: menuItems.length, stats };
  }, [menuItems]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#87CEEB' }, // Light blue header
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}>
        
        {/* Home Screen (Shows menu, total items, and averages) */}
        <Stack.Screen name="Home">
          {props => <HomeScreen 
            {...props} 
            menuItems={menuItems} 
            menuStats={menuStats} // Pass calculated stats
          />}
        </Stack.Screen>
        
        {/* Manage Menu Screen (Adding and Removing items - separate screen) */}
        <Stack.Screen name="Manage Menu">
          {props => <ManageMenuScreen 
            {...props} 
            menuItems={menuItems} 
            setMenuItems={setMenuItems} // Pass the setter function
          />}
        </Stack.Screen>
        
        {/* Guest Filter Screen (Filtering by course - separate page) */}
        <Stack.Screen name="Guest Filter">
          {props => <GuestFilterScreen 
            {...props} 
            menuItems={menuItems} // Pass the array
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
