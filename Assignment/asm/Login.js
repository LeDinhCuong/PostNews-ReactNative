import {Pressable,StyleSheet,Text,TextInput,View,Image, TouchableOpacity,} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useContext, useState } from "react";
import AxiosIntance from "./ultil/AxiosIntance";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "./ultil/AppContext";

const Login = (props) => {
  const {navigation} = props;
  const [emailUser, setemailUser] = useState("");
  const [passwordUser, setpasswordUser] = useState("");
  const {setisLogin,setinfoUser} = useContext(AppContext);

  //chuyen qua screen dk
  const dangKy = () => {
    navigation.navigate('Register');
  }
  const dangNhap = async() => {
    try{
      const response = await AxiosIntance().post('auth/login',{email: emailUser,password: passwordUser});
      if(response.error == false){
        //
        console.log(response.data.token);
        await AsyncStorage.setItem('token',response.data.token); //luu tru token
        ToastAndroid.show('Đăng nhập thành công',ToastAndroid.SHORT);
        setinfoUser(response.data.user)
        setisLogin(true);
      }else{
        ToastAndroid.show('Đăng nhập thất bại',ToastAndroid.SHORT);
      }
    }catch(e){
      console.log(e);
      ToastAndroid.show('Tài khoản không chính xác',ToastAndroid.SHORT);
      }
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.textTitle, { marginTop: 10 }]}>Hello</Text>
      <Text style={[styles.textTitle, { color: "#1877F2" }]}>Again!</Text>
      <Text style={styles.welcomeText}>
            Welcome to {"\n"}       my assignment
      </Text>

      <Text style={[styles.text,{marginStart:10}]}>Username</Text>
      <TextInput style={styles.textInput} onChangeText={setemailUser}/>
      <Text style={[styles.text,{marginStart:10}]}>Password</Text>
      <TextInput style={styles.textInput} onChangeText={setpasswordUser} />

      <View style={[styles.viewRemember, { justifyContent: "space-between", margin: 10 },]}>
        <View style={styles.viewRemember}>
          <BouncyCheckbox fillColor="#1877F2" />
          <Text style={styles.text}>Remember me</Text>
        </View>
        <Text style={styles.text}>Forget the password?</Text>
      </View>
      
        <TouchableOpacity style={styles.buttonLogin} onPress={dangNhap}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonLogin,{marginTop:10}]} onPress={dangKy}>
          <Text style={styles.textButton}>Register</Text>
      </TouchableOpacity>  
    

      <Text style={[styles.text,{ alignSelf: "center", margin: 6 }]}>or continue with</Text>

      <View style={[styles.viewRemember, { justifyContent: "space-between" }]}>
        <Pressable style={styles.buttonSocial}>
          <Image source={require("./Images/facebook.png")} />
          <Text style={{ marginLeft: 10}}>FaceBook</Text>
        </Pressable>
        <Pressable style={styles.buttonSocial}>
          <Image source={require("./Images/google.png")} />
          <Text style={{ marginLeft: 10 }}>Google</Text>
        </Pressable>
      </View>
      
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor:'black'
  },
  textTitle: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 20,
  },
  text:{
    color:'#C0C0C0'
  },
  welcomeText: {
    marginStart: 140,
    fontSize: 20,
    color: "#B6EADA",
    marginBottom: 20,
  },
  textInput: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    paddingLeft:10,
    backgroundColor:'#FFFFFF'
  },
  viewRemember: {
    flexDirection: "row",
  },
  buttonLogin: {
    height: 45,
    backgroundColor: "#1877F2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonSocial: {
    flexDirection: "row",
    borderRadius: 7,
    width: 150,
    height: 48,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
