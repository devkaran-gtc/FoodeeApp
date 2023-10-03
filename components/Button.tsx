import React from 'react'
import { Text } from 'react-native';
import {TouchableOpacity } from 'react-native-gesture-handler'

interface Props{
    text: string;
    color:string;
    textColor:string;
}

const Button = (props:Props) => {
  return (
    <TouchableOpacity style={{backgroundColor:props.color,borderRadius:30,marginHorizontal:30}}>
        <Text style={{color:props.textColor,textAlign:"center",fontSize:18,paddingVertical:11,}}>{props.text}</Text>
    </TouchableOpacity>
  )
}
export default Button