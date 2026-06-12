const initialState = {
  list: [],
  fetchState: 'NOT_FETCHED' 
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ADDRESSES':
      return { ...state, list: action.payload, fetchState: 'FETCHED' };
    case 'DELETE_ADDRESS':
      return { ...state, list: state.list.filter(addr => addr.id !== action.payload) };
    default:
      return state;
  }
};