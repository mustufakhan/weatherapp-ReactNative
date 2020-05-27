import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Myheader from './Components/Myheader';
import Home from './Components/Home'; 
import Search from './Components/Search';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer >
     <Tab.Navigator 
      tabBarOptions={{
        labelStyle: { fontSize: 15 ,marginBottom:10},
        tabStyle: { width: 100 }
        
      }} >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize:20
  },
});
