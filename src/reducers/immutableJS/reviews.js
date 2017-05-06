import { List, Set, Map } from 'Immutable'

const reviews = (state=List(), action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      const newReview = Map(
        { id: action.id,
          item_id: action.item_id,
          reviewer: action.reviewer,
          text: action.text,
          rating: action.rating,
          flag: false
        }
      )
      return state.push(newReview);
    case 'DELETE_REVIEW':
      return state.filter(review => review.id !== action.id);
    case 'FLAG_REVIEW':
      return state.map(review => review.id === action.id ? Object.assign({}, review, { flag: action.flag}): review)
    case 'RATE_REVIEW':
      return state.map(review => review.id === action.id ? {...review, rating: action.rating }: review)
    default:
      return state;
  }
}

export default reviews;
