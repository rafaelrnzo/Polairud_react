import React, { useCallback, useRef ,useState} from 'react';
import { StyleSheet, TouchableOpacity, View, Image,Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from '../Widget/BottomSheet';
import Realtime from '../Widget/PLN/Realtime';
import Total from '../Widget/PLN/Total';

export default function App() {
  const ref = useRef<BottomSheetRefProps>(null);

  const [shouldShow, setsShouldShow] = useState(true);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-400);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }} className="bg-slate-100" >
      <View className="flex-1 " >
        <View className="flex-row items-center flex-none justify-center  p-2 m-2 mt-6">
          <View className="bg-white px-16 rounded-xl py-3" style={styles.shadow}>
            <Text className="text-2xl text-blue-700 font-bold" style={{fontFamily: 'Inter'}}>Monitoring PLN</Text>
          </View>
          <View className="flex-1 items-start flex-row justify-end rounded-full " >
            <TouchableOpacity  onPress={onPress} className="bg-white rounded-full " style={styles.shadow}>
              <Image source={require('../img/stat.png')} className="w-8 h-8 p-1 m-2"/>
            </TouchableOpacity>
          </View>
          
          
        </View>
        <View className='flex-1 m-4 my-1 mt-0 ' >
          <View className=' flex-1 relative'>
            <View className="flex-1">
              {
                shouldShow ?  
                (<Realtime/>) :
               ( <Total/>)
              }
            </View>
          </View>
        </View>
          <View className=' items-end flex-none fixed m-5 justify-end '>
            <View className="flex-row items-center ">
              <TouchableOpacity onPress={() => setsShouldShow(!shouldShow)}>
                <Image source={require('../img/change.png')} className="h-16 w-16"/>
              </TouchableOpacity>
            </View>
          </View>
      </View>
        <BottomSheet ref={ref}>
          
        </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171bc5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // bgBlur: {
  //   opacity: 0.3,
  //   backgroundColor: 'black'
  // }

  shadow: {
    shadowColor: "#3f3f3f",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity:  0.20,
    shadowRadius: 5.62,
    elevation: 8  }

});