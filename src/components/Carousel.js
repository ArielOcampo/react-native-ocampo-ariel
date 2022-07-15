import { StatusBar } from "expo-status-bar";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import citiesActions from '../redux/actions/citiesActions'
import { BlurView } from 'expo-blur';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

function Backdrop({ scrollX }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(citiesActions.getCities())
  }, []);
  const cities = useSelector(store => store?.citiesReducer?.cities)



  return (

    <View
      style={[
        {
          position: "absolute",
          height: ALTURA_BACKDROP,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >

      {cities?.map((city, index) => {
        const inputRange = [
          (index - 1) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 1) * ANCHO_CONTENEDOR,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.Image
            key={index}
            source={{ uri: city?.image }}
            style={[
              { width: width, height: ALTURA_BACKDROP, opacity },
              StyleSheet.absoluteFillObject,
            ]}
          />


        );
      })}
      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          width,
          height: ALTURA_BACKDROP,
          position: "absolute",
          bottom: -15,

        }}
      />
      <View >
        <BlurView intensity={50} tint="dark" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
          <Text style={{ color: 'white', padding: 30, fontWeight: 'bold', fontSize: 18 }}>Popular Mytineraries</Text>
        </BlurView>


      </View>
    </View>
  );
}

export default function Carousel() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const cities = useSelector(store => store.citiesReducer.cities)

  return (

    <SafeAreaView >

      <View style={styles.container}>

        <StatusBar hidden />
        <Backdrop scrollX={scrollX} />

        <Animated.FlatList

          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}

          showsHorizontalScrollIndicator={false}
          horizontal={true}
          snapToAlignment="start"
          contentContainerStyle={{
            paddingTop: 200,
            paddingBottom: 50,
            paddingHorizontal: ESPACIO_CONTENEDOR,
          }}

          snapToInterval={ANCHO_CONTENEDOR}
          decelerationRate={0}
          scrollEventThrottle={16}

          data={cities}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ANCHO_CONTENEDOR,
              index * ANCHO_CONTENEDOR,
              (index + 1) * ANCHO_CONTENEDOR,
            ];

            const scrollY = scrollX.interpolate({
              inputRange,
              outputRange: [0, -50, 0],
            });
            return (
              <View style={{ width: ANCHO_CONTENEDOR }}>

                <Animated.View
                  style={{
                    marginHorizontal: ESPACIO,
                    padding: ESPACIO,
                    borderRadius: 34,
                    backgroundColor: "#1f2937",
                    alignItems: "center",
                    transform: [{ translateY: scrollY }],
                  }}
                >


                  <Image source={{ uri: item?.image }} style={styles.posterImage} />
                  <Text style={{ fontWeight: "bold", fontSize: 26, color: 'white' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 15, color: 'white' }}>
                    {item.country}
                  </Text>

                </Animated.View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    justifyContent: "center",

  },
  posterImage: {
    position: "relative",
    width: "100%",
    height: ANCHO_CONTENEDOR * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});