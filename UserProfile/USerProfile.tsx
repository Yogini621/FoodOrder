import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component } from 'react'

interface User {
    id:number,
    name:string,
    contact:string,
    email:string,
    address:string
}

interface State {
    users:User[]
    name:string,
    contact:string,
    email:string,
    address:string
}

export default class USerProfile extends Component <{},State>{
    constructor(props:{}){
        super(props)
        this.state = {
            users:[],
            name:'',
        }
    }
  render() {
    return (
      <View>
        <Text>USerProfile</Text>
        <TextInput 
        placeholder='Enter Name'
        value={this.state.}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})