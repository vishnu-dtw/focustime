import React,{ useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {colors} from '../utils/colors'
import {RoundedButton} from '../components/Roundedbutton'

const Focus = ({addSubject}) => {
  const [subject,setSubject]=useState(null)
  console.log(subject)
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput}
          onChangeText={setSubject} placeholder="What would you like to focus on?" 
        />
        <View style={styles.button}>
        <RoundedButton title="+" size={50} onPress= {() => addSubject(subject)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'top',
    alignItems: 'top',
  },
  inputContainer: {
    
    flex: 1,
    margin: 20,
  },
  button: {
    justifyContent: 'center',
  },
  textInput: {

   backgroundColor: colors.white,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default Focus;
