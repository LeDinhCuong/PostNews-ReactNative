import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemListNews from './ItemListNews'
import AxiosIntance from './ultil/AxiosIntance';

const NewsDetail = (props) => {
  const {route} = props;
  const {params} = route;
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [imagUrl, setimagUrl] = useState("");
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () =>{
      const response = await AxiosIntance().get('articles/'+ params.id +'/detail');
      console.log(response);
      if(response.error == false){ //lấy data thành công
        settitle(response.data[0].title);
        setcontent(response.data[0].content);
        setimagUrl(response.data[0].image);
        setisLoading(false);
      }else{
        ToastAndroid.show('Lấy dữ liệu thất bại',ToastAndroid.SHORT);
      }
    }

    getDetails();
  
    return () => {
      
    }
  }, [])
  

  return (
    <>
    {
      isLoading == true ?
      <View style={{flex:1,justifyContent:"center",alignItems:'center', backgroundColor:'black'}}>
        <ActivityIndicator size='large' color='blue'/>
        <Text style={{color:'#FFFFFF'}}>Loading</Text>
      </View>
      :
      <ScrollView style={styles.container}>
      <Image source={{uri: imagUrl}} style={styles.image}/>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      </ScrollView>
    }
    </>
    
  )
}

export default NewsDetail

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
  image:{
    height:240,
    width: 335,
    margin:14,
    borderRadius:5,
  },
  title:{
    width:300,
    color:'#A4A4A4',
    fontSize:15,
    marginLeft:15,
  },
  content:{
    color:'#FFFFFF',
    fontSize:18,
    margin:13
  }
})


