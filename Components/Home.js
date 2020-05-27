import React from 'react';
import { StyleSheet, Text, View ,ScrollView,Image, AsyncStorage} from 'react-native';
import { TextInput,Card ,List, Title} from 'react-native-paper';
import Myheader from './Myheader'
import {LinearGradient} from 'expo'

const api = {
  key: "e89563286d89489c8f4c7000f0279d42",
  base: "https://api.openweathermap.org/data/2.5/"
}


export default class Home extends React.Component {
  state={
    info:{
      name:"loading..",
      temp:"loading",
      humidity:"loading..",
      icon:'loading',
      desc:"loading.."

    }
  }
  
async getweather(){
  query= await AsyncStorage.getItem('city')
  if(query ===''){
    query="india"
  }
  query="this.props.route.params.city";
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(res => res.json())
  .then(result => {
  this.setState({
    info:{
      name:result.name,
      temp:result.main.temp,
      humidity:result.main.humidity,
      icon:result.weather[0].icon,
      desc:result.weather[0].description, 
    }
   

  })
    
  });
 }

 componentDidMount(){
  this.getweather() 
}
   
  render(){
    if(this.props.route.params.city != ''){
      this.getweather()
    }
    
        return (
      <View style={styles.container}>
        <Myheader title="Currrent Weather"/>
    <Card style={{margin:20}}>
      
      <View style={{padding:20,alignItems:"center" ,backgroundColor:"gainsboro"}}>
        <Title style={styles.text}>{this.state.info.name}</Title>
        <Image   style={{width:120, height:120}} source={{uri:'https://openweathermap.org/img/w/'+this.state.info.icon+".png"}}/>
        <Title style={styles.text}>TEMPERATURE:{this.state.info.temp}</Title>
        <Title style={styles.text}>HUMIDITY:{this.state.info.humidity}</Title>
        <Title style={styles.text}>{this.state.info.desc}</Title>
      
      </View>
     
    </Card>
      </View>
     
    );
  }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  text:{
    textAlign:"center",
    marginBottom:10,
    color:"darkslategray",
    fontSize:30
  }
});

