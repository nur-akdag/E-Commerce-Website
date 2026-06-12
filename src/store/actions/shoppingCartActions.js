export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product
});

export const toggleChecked = (productId) => ({ type: 'TOGGLE_CHECKED', payload: productId });
export const increaseCount = (productId) => ({ type: 'INCREASE_COUNT', payload: productId });
export const decreaseCount = (productId) => ({ type: 'DECREASE_COUNT', payload: productId });
export const removeFromCart = (productId) => ({ type: 'REMOVE_FROM_CART', payload: productId });