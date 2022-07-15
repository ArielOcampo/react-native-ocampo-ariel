import { View, Text } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import citiesActions from '../redux/actions/citiesActions'
import itinerariesActions from '../redux/actions/itinerariesActions'

const ItinerarieDetails = ({ route, navigation }) => {
  const { id } = route.params;

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   const onecity = dispatch(citiesActions.getOneCity(id))
  //   dispatch(itinerariesActions.getItinerariesById(id))
  //   console.log(onecity)
  //   // eslint-disable-next-line
  // }, []);
  return (
    <View>
      <Text style={{ color: 'white' }}>dddasdasdasddd</Text>
    </View>
  )
}

export default ItinerarieDetails