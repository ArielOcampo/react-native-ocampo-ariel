import { View, Text, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native'
import React from 'react'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import citiesActions from '../redux/actions/citiesActions'
import FondoCities from '../media/fondo-cities.png'
import SearchBar from "react-native-dynamic-search-bar";
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';




const Cities = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(citiesActions.filterCities(search))
  }, [search]);
  const cities = useSelector(store => store?.citiesReducer?.filter)
  const { height } = Dimensions.get("window");
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <ImageBackground source={FondoCities} resizeMode="cover" >
        <View style={{ padding: 15 }}>
          <SearchBar
            darkMode='true'
            fontColor="#fff"
            placeholder="Search here"
            onChangeText={event => setSearch(event)}
            onSearchPress={() => console.log("Search Icon is pressed")}
            onClearPress={() => setSearch("")}

          />

        </View>

        <View style={{ marginBottom: 140 }}>
          <ScrollView >
            {cities.length > 0 ? (
              cities.map(city =>
                <Card style={{ margin: 10, backgroundColor: '#1f2937', }} isDark={true} key={city._id}>
                  <CardTitle
                    titleStyle={{ textAlign: 'center', fontWeight: 'bold' }}
                    subtitleStyle={{ textAlign: 'center', fontWeight: 'bold' }}
                    subtitleAbove={false}
                    title={city.name}
                    subtitle={city.country}
                  />
                  <CardImage
                    source={{ uri: city.image }}
                  />
                  <CardContent

                    text={city.description}
                  />
                  <CardAction separator={true} inColumn={false}>
                    <CardButton
                      onPress={() => { navigation.navigate('Details', { id: city._id }) }}
                      title="See more"
                      color='white'
                      style={{ backgroundColor: '#1e429f', flex: 1, marginLeft: 250, marginRight: 30, marginBottom: 15, borderRadius: 10 }}
                      titleStyle={{ fontWeight: 'bold' }}
                    />

                  </CardAction>
                </Card>)) : (<View style={{ height: 600, flex: 1, alignItems: 'center' }}><Image style={{ width: width }} source={require('../media/search.gif')} /><BlurView intensity={40} tint="dark" ><Text style={{ fontSize: 30, color: 'white', padding: 5, fontWeight: 'bold' }}>Sorry no cities were found</Text></BlurView></View>)}


          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  )
}


export default Cities

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',


  },
});