import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./asm/Login";
import ItemListNews from "./asm/ItemListNews";
import ListNews from "./asm/ListNews";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./asm/Register";
import { AppContextProvider } from "./asm/ultil/AppContext";
import AppNavigator from "./asm/ultil/AppNavigator";
import NewsDetail from "./asm/NewsDetail";


const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Screen1'>
    //     <Stack.Screen name="Screen1" component={Screen1} />
    //     <Stack.Screen name="Screen2" component={Screen2} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="Screen1" component={Screen1} options={{title:'Trang chủ'}} />
    //     <Tab.Screen name="Screen2" component={Screen2} options={{title:'Cài đặt'}}/>
    //   </Tab.Navigator>
    // </NavigationContainer>
    
    // <NewsDetail/>

    // <ListNews/>

      <AppContextProvider>
        <NavigationContainer>
          <AppNavigator/>
        </NavigationContainer>
      </AppContextProvider>
  );
};

export default App;
