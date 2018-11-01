import React, {Component} from 'react';
import {StyleSheet,FlatList,ImageBackground,TouchableHighlight, View,SafeAreaView, Text, Image ,ScrollView} from 'react-native';
var bedFlag= false
var bed = require("../images/coffe.png")
export default class Breakfast extends Component{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
    }
    bedOrCoffe=()=>{
            require("../images/coffe.png")
            this.props.navigation.navigate('Detail')
    }
render(){
    var breakfast=[
        {key:'Desayuno americano $200'},
        {key:'Huevos revueltos, cafe y facturas $100'},
        {key:'Torta de manzana con te $130'},
        {key:'Cereales y granola $ 50'},
        {key:'Diente libre $250'}
        
    ]
    return(

  
    <View style={{flex:1, paddingTop:30}}>
    <ImageBackground style={{position:'absolute' ,width:100+'%',height:110+'%'}} source={require("../images/desayuno1.jpg")}/>
    <TouchableHighlight underlayColor='transparent'  onPress={() => this.bedOrCoffe()}> 
        <Image source={bed} style={{position:'relative',width:100,height:100}}/>  
    </TouchableHighlight>
    <FlatList
        data={breakfast}
        renderItem={({item})=><Text style={{padding:20,fontFamily:'custom',fontSize:50,color:'green',borderBottomWidth:3,borderBottomColor:'skyblue'}}>{item.key}</Text>}
    >
    </FlatList>
        </View>  

        )
    }
}
const styles = StyleSheet.create({


})