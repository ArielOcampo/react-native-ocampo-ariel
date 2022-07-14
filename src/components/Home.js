import { View, Text, Button, StyleSheet, Dimensions, TouchableHighlight, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { Video } from 'expo-av';
import Carousel from '../components/Carousel';
import tw from 'twrnc'
import { ScrollView } from 'react-native-gesture-handler';



const { height } = Dimensions.get("window");
var box_count = 3;
var box_height = height / box_count;


export default function Home({ navigation }) {

  return (
    <ScrollView >
      <SafeAreaView >

        <View style={styles.container}>

          <Text >Home</Text>
          <View style={{ height: 200, }}>
            <Video
              source={require("../media/video-hero.mp4")}
              style={styles.backgroundVideo}
              rate={1}
              shouldPlay={true}
              isLooping={true}
              volume={1}
              muted={true}
              resizeMode="cover"
            />
          </View>

          {/* style={tw`text-black h-70 w-full bg-blue-600 flex justify-center items-center rounded-xl  bg-opacity-20 backdrop-blur-2xl bg-blue-900 shadow-xl`} */}
          <View style={[styles.box, styles.box2]} >
            <Text style={tw`text-black text-xl mx-10 flex items-center justify-center `}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
            <TouchableHighlight style={{
              height: 40,
              width: 200,
              borderRadius: 10,
              backgroundColor: "#1f2937",
              marginLeft: 50,
              marginRight: 50,
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{
                color: 'white', fontSize: 14, fontWeight: 'bold',
              }}>Find your next experience</Text>
            </TouchableHighlight>

          </View>
          <Button style={tw` py-3 px-6 rounded-md bg-sky-600 focus:bg-sky-700 active:bg-sky-500`} title="Open drawer" onPress={() => navigation.openDrawer()} />
          <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
          <View style={[styles.box, styles.Carousel]}>
            <Carousel />
          </View>
        </View>

      </SafeAreaView>
    </ScrollView >


  );


}
const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    marginTop: -15,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  box: {
    height: box_height
  },
  Carousel: {
    height: '100%',
  }
});



