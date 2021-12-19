import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import Map from "./screens/map";
import SelectUser from "./screens/selectUser";
import UserInformation from "./screens/userInformation";
import UserLogin from "./screens/userLogin";
import UserSignup from "./screens/userSignup";
import { store } from "./store";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDashboard from "./screens/userDashboard";
import ManagerLogin from "./screens/ManagerLogin";
import ManagerDashboard from "./screens/managerScreen";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} >
          <Stack.Group
            screenOptions={{ headerStyle: { backgroundColor: '#36e697' } }}
          >
          
            <Stack.Screen
              name="SelectUser"
              component={SelectUser}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="UserLogin"
              component={UserLogin}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="UserSignup"
              component={UserSignup}
            />
            <Stack.Screen
              name="Map"
              component={Map}
              options={{
                headerShown: false
              }} />
            <Stack.Screen
              name="UserInformation"
              component={UserInformation}
            />
            <Stack.Screen
              name="UserDashboard"
              component={UserDashboard}
            />
            <Stack.Screen
              name="ManagerLogin"
              component={ManagerLogin}
            />
              <Stack.Screen
              name="ManagerDashboard"
              component={ManagerDashboard}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


