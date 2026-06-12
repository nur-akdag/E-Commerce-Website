const initialState = {
  cart: [] 
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProductIndex = state.cart.findIndex(
        item => item.product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].count += 1;
        return { ...state, cart: updatedCart };
      } else {
        return { 
          ...state, 
          cart: [...state.cart, { count: 1, checked: true, product: action.payload }] 
        };
      }

    case 'REMOVE_FROM_CART':
      return { 
        ...state, 
        cart: state.cart.filter(item => item.product.id !== action.payload) 
      };

    case 'TOGGLE_CHECKED':
      return { ...state, cart: state.cart.map(item => 
        item.product.id === action.payload ? { ...item, checked: !item.checked } : item 
      )};

    case 'INCREASE_COUNT':
      return { ...state, cart: state.cart.map(item => 
        item.product.id === action.payload ? { ...item, count: item.count + 1 } : item 
      )};

    case 'DECREASE_COUNT':
      return { ...state, cart: state.cart.map(item => 
        item.product.id === action.payload && item.count > 1 ? { ...item, count: item.count - 1 } : item 
      )};

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
};