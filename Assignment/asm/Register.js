import {Pressable,StyleSheet,Text,TextInput,View,Image, ToastAndroid, TouchableOpacity,} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useState } from "react";
import AxiosIntance from "./ultil/AxiosIntance";

const Register = (props) => {
  const {navigation} = props;
  const [emailUser, setemailUser] = useState("");
  const [passwordUser, setpasswordUser] = useState("");

  const dangky = async() => {
    console.log(emailUser,passwordUser);
    try{
      const response = await AxiosIntance().post('users/register',{email: emailUser,password: passwordUser});
      console.log(response);
      if(response.error == false){
        ToastAndroid.show('Đăng ký thành công',ToastAndroid.SHORT);
        navigation.navigate('Login');
      }
    }catch(e){
      console.log(e);
      ToastAndroid.show('Tài khoản đã có người đăng kí',ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Register</Text>

      <Text style={[styles.text,{marginStart:10}]}>Username</Text>
      <TextInput style={styles.textInput} onChangeText={setemailUser}/>
      <Text style={[styles.text,{marginStart:10}]}>Password</Text>
      <TextInput style={styles.textInput} onChangeText={setpasswordUser}/>

      <View
        style={[
          styles.viewRemember,
          { justifyContent: "space-between", margin: 10 },
        ]}
      >
        <View style={styles.viewRemember}>
          <BouncyCheckbox fillColor="#1877F2" />
          <Text style={styles.text}>Remember me</Text>
        </View>
        <Text style={styles.text}>Forget the password?</Text>
      </View>

      <TouchableOpacity style={styles.buttonLogin} onPress={dangky}>
        <Text style={styles.textLogin}>Register</Text>
      </TouchableOpacity>

      <Text style={[styles.text,{ alignSelf: "center", margin: 6 }]}>or continue with</Text>

      <View style={[styles.viewRemember, { justifyContent: "space-between" }]}>
        <Pressable style={styles.buttonSocial}>
          <Image source={require("./Images/facebook.png")} />
          <Text style={{ marginLeft: 10 }}>FaceBook</Text>
        </Pressable>
        <Pressable style={styles.buttonSocial}>
          <Image source={require("./Images/google.png")} />
          <Text style={{ marginLeft: 10 }}>Google</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor:'black'
  },
  text:{
    color:'#FFFFFF'
  },
  textTitle: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#1877F2",
    alignSelf:"center",
    marginTop:50,
    marginBottom:50
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
    height: 47,
    backgroundColor: "#1877F2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  textLogin: {
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
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
