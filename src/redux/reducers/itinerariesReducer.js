const initalState = {
  itineraries: [],
  auxiliar: [],
  oneItinerary: {},
  getItinerariesByCity: []

}
const citiesReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'GET_ITINERARIES':
      return {
        ...state,
        itineraries: action.payload,
        auxiliar: action.payload,

      }
    case 'GET_ITINERARY':
      return {
        ...state,
        oneItinerary: action.payload
      }

    case 'GET_ITINERARIES_BY_ID':

      return {
        ...state,
        getItinerariesByCity: action.payload

      }
    default:
      return state
  }
}
export default citiesReducer