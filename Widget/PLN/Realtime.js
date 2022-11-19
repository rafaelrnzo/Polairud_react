import { StyleSheet, Text, View } from 'react-native'
import React,{Component} from 'react'

class Realtime extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <View className="flex-1 ">
        <View className='flex-none' >
          <View className='items-center m-4 bg-white p-2 mx-14 rounded-xl' style={styles.shadow1}>
            <Text className='text-2xl font-bold text-blue-700' style={{fontFamily: 'Inter'}}>Realtime Energy</Text>
          </View>
        </View>
        <View className='flex-1 '>
          <View className='flex-1 bg-blue-700 m-4 mt-2 rounded-2xl ' style={styles.shadow}>
            <View className='flex-1 items-center justify-center gap-3'>
              <View className=''>
                <Text className='text-2xl font-semibold text-white' style={{fontFamily: 'Inter'}}>Surveilance</Text>
              </View>
                <View className='border-white border w-2/3'></View>
              <View className='flex-row gap-2'>
                <Text className='text-l font-semibold text-white' style={{fontFamily: 'Inter'}}>0.00 Kwh</Text>
                <Text className='text-l font-semibold text-white' style={{fontFamily: 'Inter'}}>0.00 Kwh</Text>
                <Text className='text-l font-semibold text-white' style={{fontFamily: 'Inter'}}>0.00 Kwh</Text>
              </View>
            </View>
            <View></View>
          </View>
        </View>
        <View className='flex-1 '>
          <View className='flex-1 bg-blue-700 m-4 mt-2 rounded-2xl ' style={styles.shadow}>
            <View className='flex-1 items-center justify-center gap-3'>
              <View className=''>
                <Text className='text-2xl font-semibold text-white' style={{fontFamily: 'Inter'}}>Cooling System</Text>
              </View>
                <View className='border-white border w-2/3'></View>
              <View className='flex-row gap-2'>
                <Text className='text-l font-semibold text-white' style={{fontFamily: 'Inter'}}>0.00 Kwh</Text>
                <Text className='text-l font-semibold text-white' style={{fontFamily: 'Inter'}}>0.00 Kwh</Text>
                <Text className='text-l font-semibold text-white' style={{fontFamily: 'Inter'}}>0.00 Kwh</Text>
              </View>
            </View>
            <View></View>
          </View>
        </View>
        <View className='flex-1 '>
          <View className='flex-1 bg-blue-700 m-4 mt-2 rounded-2xl ' style={styles.shadow}>
            <View className='flex-1 items-center justify-center gap-3'>
              <View className=''>
                <Text className='text-2xl font-semibold text-white' style={{fontFamily: 'Inter'}}>Accessories</Text>
              </View>
                <View className='border-white border w-2/3'></View>
              <View className='flex-row gap-2'>
                <Text className='text-l font-semibold text-white' style={{fontFamily: 'Inter'}}>0.00 Kwh</Text>
                <Text className='text-l font-semibold text-white' style={{fontFamily: 'Inter'}}>0.00 Kwh</Text>
                <Text className='text-l font-semibold text-white' style={{fontFamily: 'Inter'}}>0.00 Kwh</Text>
              </View>
            </View>
            <View></View>
          </View>
        </View>
        
      </View>
    );
  }
}

export default Realtime;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#2e56e4",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity:  0.23,
    shadowRadius: 11.27,
    elevation: 14
  },
  shadow1: {
    elevation: 6
  }
});