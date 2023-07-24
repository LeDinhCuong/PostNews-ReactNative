import {Image, StyleSheet, Text, View ,TouchableOpacity,TextInput} from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from './ultil/AppContext'
import * as ImagePicker from 'expo-image-picker';
import AxiosIntance from './ultil/AxiosIntance'
import { ToastAndroid } from 'react-native'

const UpdateProfile = () => {
  const {infoUser,setinfoUser,setisLogin} = useContext(AppContext);
  console.log(infoUser);

  const getImageLibrary = async () => {
    try {
      const result  = await ImagePicker.launchImageLibraryAsync();
        console.log(result.assets[0].uri);

        const formdata = new FormData();
        formdata.append('image',{
          uri: result.assets[0].uri,
          type: 'image/ipeg',
          name: 'image.jpg',
        });

        const response =  await AxiosIntance('multipart/form-data').post('media/upload',formdata);
        console.log(response.data.path);

        //update vulue cho 1 object
        setinfoUser({...infoUser,avatar: response.data.path});

        if(response.error == false){
          ToastAndroid.show('Upload thành công',ToastAndroid.SHORT);
        }else{
          ToastAndroid.show('Upload thất bại',ToastAndroid.SHORT);
        }
    } catch (e) {
      console.log(e);
    }
  }

  const updateProfile = async () => {
      const response = await AxiosIntance().post('users/update-profile',{name: infoUser.name, address: infoUser.address, phone: infoUser.phone, dob: infoUser.dob, avatar: infoUser.avatar });
      if(response.error == false ){
        ToastAndroid.show('Update thành công',ToastAndroid.SHORT);
      }
  }
  const logout = () => {
    setisLogin(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TouchableOpacity onPress={getImageLibrary}>
        {
        infoUser.avatar ==""
        ?
        <Image style={styles.image} source={require('../asm/Images/personfb.jpg')}/>
        :
        <Image style={styles.image} source={{uri: infoUser.avatar}} />
        }
      </TouchableOpacity>

      <Text style={{textAlign:'center',color:'#656464',margin:10}}>{infoUser.email}</Text>
      <Text style={[styles.text,{marginStart:10}]}>Username</Text>
      <TextInput style={styles.textInput} value={infoUser.name} onChangeText={(text) => setinfoUser({...infoUser, name: text})}/>
      <Text style={[styles.text,{marginStart:10}]}>Address</Text>
      <TextInput style={styles.textInput} value={infoUser.address}onChangeText={(text) => setinfoUser({...infoUser, address: text})}/>
      <Text style={[styles.text,{marginStart:10}]}>PhoneNumber</Text>
      <TextInput style={styles.textInput} value={infoUser.phone}onChangeText={(text) => setinfoUser({...infoUser, phone: text})}/>
      <Text style={[styles.text,{marginStart:10}]}>Dob</Text>
      <TextInput style={styles.textInput} value={infoUser.dob}onChangeText={(text) => setinfoUser({...infoUser, dob: text})} />

      <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.textButton}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={logout}>
        <Text style={styles.textButton2}>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
    padding:10
  },
  image:{
    height:90,
    width:90,
    alignSelf:'center',
    borderRadius:100
  },
  title:{
    fontSize:16,
    alignSelf:'center',
    margin:10,
    marginTop:20,
    marginBottom:20,
    color:'#FFFFFF'
  }, 
  text:{
    color:'#C0C0C0'
  },
  textInput: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    paddingLeft:10,
    backgroundColor:'#FFFFFF'
  },
  button:{
    height: 43,
    width:180,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    backgroundColor: "#1877F2",
    marginTop:17
  },
  button2:{
    height: 43,
    width:180,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    backgroundColor: "red",
    marginTop:17
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },textButton2: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  }
})