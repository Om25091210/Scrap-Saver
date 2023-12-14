import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Profile, Home, Welcome } from "./src/screens";
import Form from './src/screens/Form';

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName='Welcome'
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Form"
          component={Form}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>


    </NavigationContainer>

  );
}