const reviews = (state=[], action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
    return [
      ...state, { 
        id: action.id,
        reviewer: action.reviewer,
        text: action.text,
        rating: action.rating,
        flag: false
      }
    ]
    case 'DELETE_REVIEW':
    return state.filter(review => review.id !== action.id);
    case 'FLAG_REVIEW':
    return state.map((review, index) => review.id === action.id ? Object.assign({}, review, { flag: !action.flag}): review)
    case 'RATE_REVIEW':
    return state.map((review, index) => review.id === action.id ? [...review, {rating: action.rating}]: review)
    default:
    return state;
  }
}

export default reviews;