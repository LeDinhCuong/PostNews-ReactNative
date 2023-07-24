import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const  ItemListNews = props => {
  const {dulieu, navigation} = props;

  const ClickItem = () => {
    console.log('Clicked');
    navigation.navigate("NewsDetail",{id: dulieu._id});
  }
  return (
    <TouchableOpacity onPress={ClickItem}>
      <View style={styles.container}>
      <Image style={styles.image} source={{uri: dulieu.image}}/>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.textTitle}>{dulieu.title}</Text>
        <Text numberOfLines={2} style={styles.textContent}>{dulieu.content}</Text>
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default ItemListNews

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
  image:{
    width:300,
    height:140,
    borderRadius:5,
    backgroundColor:'blue',
    marginTop:20,
    marginLeft:7
  },
  content:{
    marginTop:5,
    marginLeft:10,
    width: 300
  },
  textContent:{
    color:'#E4E6EB',
    fontSize:16,
    marginBottom:10,
    
  },
  textTitle:{
    fontSize:13,
    color:'#B0B3B8',
    width:240
  }
})