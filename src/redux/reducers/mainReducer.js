import { combineReducers } from 'redux';
import citiesReducer from '../reducers/citiesReducer';
import itinerariesReducer from '../reducers/itinerariesReducer'
import userReducer from '../reducers/userReducer';

const mainReducer = combineReducers({
  citiesReducer,
  itinerariesReducer,
  userReducer
})

export default mainReducer