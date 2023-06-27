import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

const { height } = Dimensions.get("window")

const SheetInputText = (props) => {
  const [value, setValue] = useState("")

  const onSubmitValue = async () => {
    await SheetManager.hide(props.sheetId, {
        payload: value,
    });
  }

  return (
    <ActionSheet id={props.sheetId}>
      <View style={{height: height * .15, marginVertical: 20, marginHorizontal: 15}}>
        <View style={{borderBottomWidth: .5, borderBottomColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{width: 20, marginRight: 10}}>
            {/* {props.payload.keyboardType === 'decimal-pad' && <Icon name='calculator' type='font-awesome' size={18} color={"#2F3132"}/>}
            {props.payload.keyboardType === 'email-address' && <Icon name='email' type='entypo' size={18} color={"#2F3132"}/>}
            {props.payload.keyboardType === 'phone-pad' && <Icon name='old-phone' type='entypo' size={18} color={"#2F3132"}/>}
            {props.payload.keyboardType === 'default' && <Icon name='keyboard-o' type='font-awesome' size={18} color={"#2F3132"}/>} */}
          </View>
          <TextInput 
            // keyboardType={props.payload.keyboardType}
            style={{height: 40, fontFamily: 'Poppins-Regular', flex: 1}} 
            value={value} 
            placeholder={"Input disini..."}
            onChangeText={(text) => setValue(text)} />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={onSubmitValue} style={{backgroundColor: '#FFC804', paddingVertical: 10, paddingHorizontal: 50}}>
            <Text style={{fontFamily: 'Poppins-Bold', color: 'white'}}>Okey</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  )
}

export default SheetInputText

const styles = StyleSheet.create({})