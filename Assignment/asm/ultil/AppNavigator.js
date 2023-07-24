import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Login from '../Login'
import Register from '../Register'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ListNews from '../ListNews'
import { AppContext } from './AppContext'
import NewsDetail from '../NewsDetail'
import PostNews from '../PostNews'
import UpdateProfile from '../UpdateProfile'
import { setStatusBarBackgroundColor } from 'expo-status-bar'


//login, register => stack
const Stack = createNativeStackNavigator();
const Users = () => {
  return(
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
  )
}

const News = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='ListNews' component={ListNews} />
      <Stack.Screen name='NewsDetail' component={NewsDetail} />
    </Stack.Navigator>
  )
}


//list news, profile, news manage => tab
const Tab = createBottomTabNavigator();
const Main = () => {
  return(
    <Tab.Navigator  screenOptions={({route}) => ({
      tabBarStyle: ({backgroundColor:'black'}),
      headerShown:false,
      tabBarIcon: ({}) => {
        if(route.name == 'News'){
          return <Image source={require('../Images/home.png')}/>
        }else if(route.name == 'PostNews'){
          return <Image source={require('../Images/news.png')}/>
        }else if(route.name == 'UpdateProfile'){
          return <Image source={require('../Images/person.png')}/>
        }
      }
    })}>
      <Tab.Screen name='News' component={News} options={{title:'Trang chủ'}} />
      <Tab.Screen name='PostNews' component={PostNews} options={{title:'Đăng tin'}}/>
      <Tab.Screen name='UpdateProfile' component={UpdateProfile} options={{title:'Cá nhân'}}/>
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  const {isLogin} = useContext(AppContext);
  return (
    <>
    {
      isLogin == false ? <Users/> : <Main/>
    }
    </>
  )
}

export default AppNavigator

const styles = StyleSheet.create({
})