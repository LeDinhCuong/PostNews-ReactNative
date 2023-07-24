import { Button, Image, StyleSheet, Text, TextInput, ToastAndroid, View ,Pressable,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import AxiosIntance from './ultil/AxiosIntance';

const PostNews = () => {
  const [imageNe, setimageNe] = useState(null);
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');

  const capture = async () => {
    try {
      const result  = await ImagePicker.launchCameraAsync();
        console.log(result.assets[0].uri);

        const formdata = new FormData();
        formdata.append('image',{
          uri: result.assets[0].uri,
          type: 'image/ipeg',
          name: 'image.jpg',
        });
        const response =  await AxiosIntance('multipart/form-data').post('media/upload',formdata);
        console.log(response);
        if(response.error == false){
          setimageNe(response.data.path);
        ToastAndroid.show('Upload thành công',ToastAndroid.SHORT);
        }else{  
          ToastAndroid.show('Upload thất bại',ToastAndroid.SHORT);
        }
    } catch (e) {
      console.log(e);
    }
  }
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
      if(response.error == false){
        setimageNe(response.data.path);
        ToastAndroid.show('Upload thành công',ToastAndroid.SHORT);
      }else{
        ToastAndroid.show('Upload thất bại',ToastAndroid.SHORT);
      }
  
  } catch (e) {
    console.log(e);
  }
}
  const dangTin = async () => {
    try {
        const response = await AxiosIntance().post('articles',{title: title, content: content, image: imageNe});
    if(response.error == false ){
      ToastAndroid.show('Đăng tin thành công',ToastAndroid.SHORT);
    }
    } catch (e) {
        ToastAndroid.show('Vui lòng điền đầy đủ thông tin',ToastAndroid.SHORT);
    }
  }
  
  
  return (
    <View style={styles.container}>
      {
        imageNe == null
        ?
        <Image style={styles.image} source={require('../asm/Images/album.jpg')}/>
        :
        <Image style={styles.image} source={{uri: imageNe}}/>
        }

      <View style={{flexDirection:'row', justifyContent: "space-between",marginBottom:10 }}>
        <Pressable style={styles.buttonSocial} onPress={capture}>
          <Image source={require("./Images/camera.png")} />
          <Text style={{ marginLeft: 10, color:'#FFFFFF'}}>Chụp ảnh</Text>
        </Pressable>
        <Pressable style={styles.buttonSocial} onPress={getImageLibrary}>
          <Image source={require("./Images/gallery.png")} />
          <Text style={{marginLeft: 10, color:'#FFFFFF'}}>Chọn ảnh</Text>
        </Pressable>
      </View>

      <Text style={[styles.text,{marginStart:10}]}>Title</Text>
      <TextInput style={styles.textInput1} onChangeText={settitle}/>
      <Text style={[styles.text,{marginStart:10}]}>Content</Text>
      <TextInput style={styles.textInput2} onChangeText={setcontent} />


      <TouchableOpacity style={styles.button} onPress={dangTin}>
        <Text style={styles.textButton}>Đăng tin</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PostNews

const styles = StyleSheet.create({
  container:{
    padding:10,
    backgroundColor:'black',
    flex:1
  },
  image:{
    width:340,
    height:210,
    marginBottom:15,
    marginTop:10,
    borderRadius:5
  },
  text:{
    color:'#C0C0C0'
  },
  textInput1: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    paddingLeft:10,
    backgroundColor:'#FFFFFF'
  },
  textInput2: {
    height: 130,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    paddingLeft:10,
    backgroundColor:'#FFFFFF'
  },
  buttonSocial: {
    flexDirection: "row",
    borderRadius: 7,
    width: 150,
    height: 40,
    backgroundColor: "#1877F2",
    justifyContent: "center",
    alignItems: "center"
  },
  button:{
    height: 43,
    width:180,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    backgroundColor: "#1877F2",
    marginTop:12
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  }
})