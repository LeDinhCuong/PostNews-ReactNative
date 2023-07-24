import { ActivityIndicator, FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ItemListNews from "./ItemListNews";
import AxiosIntance from "./ultil/AxiosIntance";
import { TextInput } from "react-native";

const ListNews = (props) => {
    const {navigation} = props;    
    const[DATA,setDATA] =useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [searchText, setsearchText] = useState("");

    useEffect(() => {
        const getNews = async () => {
            const response = await AxiosIntance().get('articles');
            console.log(response);
            if(response.error == false){ //lấy data thành công
                setDATA(response.data);
                setisLoading(false);
            }else{
                ToastAndroid.show('Lấy dữ liệu thất bại', ToastAndroid.SHORT);
            }
        }
        getNews();
        return () => {
        }
    }, [])

    const search = async () => {
        setisLoading(true);
        const response = await AxiosIntance().get('articles/search?title='+searchText);
        if(response.error == false){
            setDATA(response.data);
            setisLoading(false);
            setsearchText('');
        }
    }

    return (
    <View style={styles.container}>
        {
        isLoading == true ? (
            <View>
                <ActivityIndicator size="large" color='blue'/>
                <Text style={{color:'white'}}>Loading</Text>
            </View>
            ) : ( 
                <View>
                    <View style={{flexDirection:'row'}}>
                    <TextInput style={styles.textInput} placeholder='Search' onChangeText={setsearchText}/>
                    <TouchableOpacity onPress={search} >
                    <Image source={require('../asm/Images/ic_search.png')} style={styles.logoSearch}/>
                    </TouchableOpacity>
                    </View>
                    
                    <FlatList
                        data={DATA} 
                        renderItem={({ item }) => <ItemListNews dulieu={item} navigation={navigation}/>}
                        keyExtractor={(item) => item._id} />
                </View>
            ) 
        }
    </View>
    );
};

export default ListNews;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'black'
    },
    textInput: {
        height:40,
        width:260,
        borderRadius: 7,
        borderWidth: 1,
        marginTop: 30,
        marginBottom:20,
        marginLeft:6,
        paddingLeft:15,
        backgroundColor:'#3A3B3C',
        color:'white'
    },
    logoSearch:{
        marginLeft:20,
        marginTop:37,
    }
});

