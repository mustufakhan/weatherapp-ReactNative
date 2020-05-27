import React from 'react';
import { StyleSheet, Text, View ,ScrollView,AsyncStorage} from 'react-native';
import { TextInput,Card ,List,Button} from 'react-native-paper';
import Myheader from './Myheader'

export default class Search extends React.Component {
  state = {
    text: '',
    cities:[]
  };
 async click(){
    this.props.navigation.navigate('Home',{
      city:this.state.text
    })
   await AsyncStorage.setItem("city",this.state.city)
  }
 async listclicked(name){
   this.setState({
     text: name
   })
   
   this.props.navigation.navigate('Home',{
    city:this.state.text
  })
  await AsyncStorage.setItem("city",this.state.city)
  }
 fetchCities(text){
   
   this.setState({text})
   fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
   .then(data =>data.json())
   .then(city=>{
    this.setState({
      cities: city.RESULTS.slice(0,9)
    })
   })
  
 }
  render(){
    renderCity=<Card><List.Item title="NO Cities"/></Card>
    if(this.state.cities.length>0){
      renderCity=this.state.cities.map(city=>{
        return(
          <Card style={{margin:3}}>
            <List.Item title={city.name} key={city.lat}  onPress={()=>this.listclicked(city.name)}/>
          </Card>
        )
      })
    }
    return (
      <View style={styles.container}>
        <Myheader title="Search City"/>
 <TextInput
        label='CITY'
        value={this.state.text}
        onChangeText={text => this.fetchCities(text)}
      />
      <Button mode="contained" style={{margin:20}} onPress={()=>this.click()}>
        Press me
      </Button>

      <ScrollView>
        {renderCity}
      </ScrollView>
      </View>
     
    );
  }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    
  },
});

