import DropDownPicker from 'react-native-dropdown-picker';
import {View,Text} from 'react-native'
import React, {useState, useEffect} from 'react';

function Options() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Surveilance', value: 'surveilance'},
    {label: 'Cooling System', value: 'cs'},
    {label: 'Accessories', value: 'acs'},
  ]);

  return (
    console.log(value),
    <View style={{marginHorizontal: 0 }}>
      <DropDownPicker
        style={{
          backgroundColor: 'blue',
          borderColor: 'white',
        }}
        textStyle={{
          color: 'white',
        }}
        dropDownContainerStyle={{
          backgroundColor: 'blue',
          borderColor: 'white'
        }}
        open={open}
        value={value }
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
}

export default Options;