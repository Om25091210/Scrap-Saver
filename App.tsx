import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Profile, Home, Welcome } from "./src/screens";
import Form from './src/screens/Form';
import SuccessPage from './src/screens/SuccessPage';
import PickupsPage from './src/screens/PickupsPage';
import { Provider } from 'react-redux';
import { mystore, persistor } from './Store';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ViewPickup from './src/screens/ViewPickupAdmin';
import ViewPickupAdmin from './src/screens/ViewPickupAdmin';
import ViewPickupUser from './src/screens/ViewPickupUser';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={mystore}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>

          <Stack.Navigator
            initialRouteName='Home'
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
            <Stack.Screen
              name="ViewPickupUser"
              component={ViewPickupUser}
              options={{
                headerShown: false
              }}
            />

            <Stack.Screen
              name="ViewPickupAdmin"
              component={ViewPickupAdmin}
              options={{
                headerShown: false
              }}
            />

          </Stack.Navigator>


        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}