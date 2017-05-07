import types from '../../actionTypes';

const reviews = (state=[], action) => {
  switch (action.type) {
    case types.reviews.ADD_REVIEW:
      return [
        ...state, {
          id: action.id,
          item_id: action.item_id,
          reviewer: action.reviewer,
          text: action.text,
          rating: action.rating,
          flag: false
        }
      ]
    case types.reviews.DELETE_REVIEW:
      return state.filter(review => review.id !== action.id);
    case types.reviews.FLAG_REVIEW:
      return state.map(review => review.id === action.id ? Object.assign({}, review, { flag: action.flag}): review)
    case types.reviews.RATE_REVIEW:
      return state.map(review => review.id === action.id ? {...review, rating: action.rating }: review)
    default:
      return sretate;
  }
}

export default reviews;
