import * as React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore as createStore } from "@reduxjs/toolkit";
import mainReducer from './src/redux/reducers/mainReducer'
import tw from 'twrnc';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from './src/components/Home';
import Cities from './src/components/Cities';
import ItinerarieDetails from './src/components/ItinerarieDetails';
const { height } = Dimensions.get("window");


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} >
      <DrawerItemList {...props} />
      <DrawerItem

        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem

        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent  {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} options={{
        title: 'Home',
        headerStyle: {
          backgroundColor: '#1f2937',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

      }} />
      <Drawer.Screen name="Cities" component={Cities} options={{
        headerStyle: {
          backgroundColor: '#1f2937',
        }
      }} />
      <Drawer.Screen name="Details" component={ItinerarieDetails} options={{ headerShown: true, drawerItemStyle: { height: 0 } }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const reduxStore = createStore({ reducer: mainReducer })
  return (
    <Provider store={reduxStore}>
      <NavigationContainer theme={scheme === 'light' ? DarkTheme : DefaultTheme}>
        <MyDrawer />
      </NavigationContainer>
    </Provider >
  );
}
const styles = StyleSheet.create({

  container: {
    // flex: 1,

  }

});