import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Profile, Home, Welcome } from "./src/screens";
import Form from './src/screens/Form';
import SuccessPage from './src/screens/SuccessPage';
import PickupsPage from './src/screens/PickupsPage';

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
          name="SuccessPage"
          component={SuccessPage}
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

        <Stack.Screen
          name="PickupsPage"
          component={PickupsPage}
          options={{
            headerShown: false
          }}
        />

      </Stack.Navigator>


    </NavigationContainer>

  );
}