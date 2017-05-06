import { combineReducers } from 'redux';
import reviews from './reviews';

const rootReducer = combineReducers({
  reviews, // reviews: reviews
});

export default rootReducer;