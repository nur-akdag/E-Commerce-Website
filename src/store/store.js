import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import { createLogger } from 'redux-logger'; 

import { clientReducer } from './reducers/clientReducer';
import { productReducer } from './reducers/productReducer';
import { shoppingCartReducer } from './reducers/shoppingCartReducer';
import { addressReducer } from './reducers/addressReducer'; 

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  address: addressReducer 
});

const logger = createLogger();

export const store = createStore(
  rootReducer, 
  applyMiddleware(thunk, logger) 
);