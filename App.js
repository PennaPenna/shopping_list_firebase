import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, StatusBar, Dimensions, FlatList } from 'react-native';
import firebase from './firebase';


export default function App() {
  const[item, setItem] = useState('');
  const[quant, setQuant] = useState('');
  const[list, setList] = useState([]);

  useEffect(() => {
    firebase.database().ref('list/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      setList(prods);
    });
  }, []); 

  const saveItem = () => {
    firebase.database().ref('list/').push(
      { 'item': item, 'quant': quant },
      () => {
      setItem('');
      setQuant('');
      }
    )
}

  const deleteItem = (key) => {
    firebase.database().ref('list/' + key).remove();
  }

   return (
    <View  style={styles.container}>
 <Text style={{fontWeight:'bold'}}>SHOPPING LIST</Text>
<TextInput
        style={{fontSize: 14, width: 200, margin:10, borderWidth:1, padding:5}}
        value={item}
        placeholder="Item"
        onChangeText={(item) => setItem(item)}
      />
<TextInput
        style={{fontSize: 14, width: 200, margin:10, borderWidth:1, padding:5}}
        value={quant}
        placeholder="Quantity"
        onChangeText={(quant) => setQuant(quant)}
      />
     <Button title="SAVE" onPress={saveItem}/>
     <FlatList 
        style={{marginLeft: "5%"}}
        keyExtractor={item => item.key.toString()}
        renderItem={({ item }) => 
          <View 
              style={styles.listcontainer}>
                < Text >{item.item}, {item.quant}</Text>
                <Text style={{color: 'red'}} 
                onPress={()  =>  deleteItem(item.key)  }> DELETE </Text>
                </View>}
        data={list}/>
     <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop:80,
  backgroundColor:'#F5F5F5',
 },
 listcontainer: { 
  flexDirection:'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop:5,
},
});
