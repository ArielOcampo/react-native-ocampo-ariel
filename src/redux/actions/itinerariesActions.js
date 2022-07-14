import axios from 'axios'
import apiUrl from '../../consts/url'

const itinerariesActions = {
  getItineraries: () => {
    return async (dispatch, getState) => {
      const res = await axios.get(`${apiUrl}api/itineraries`)

      dispatch({ type: 'GET_ITINERARIES', payload: res.data.response.itineraries })
      return res
    }

  },
  getItinerary: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get(`${apiUrl}api/itineraries/${id}`)
      dispatch({ type: 'GET_ITINERARY', payload: res.data.response })
      return res
    }

  },
  getItinerariesById: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get(`${apiUrl}api/itinerariesbycity/${id}`)

      dispatch({ type: 'GET_ITINERARIES_BY_ID', payload: res.data.response })
    }
  },
  likeDislike: (id) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(`${apiUrl}api/itineraries/like/${id}`, {}, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })

        return res

      } catch (err) {
        console.error(err);
      }
    }
  }
}

export default itinerariesActions