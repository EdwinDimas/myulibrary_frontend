// reducers/index.js

import { combineReducers } from 'redux';


// Example reducers

import { RESET_STORE } from '../actions/storeReset';
import { authApi } from '../endpoints/authApi';
import booksApi from '../endpoints/booksApi';

const appReducer = combineReducers({
  auth: authApi.reducer,
  books: booksApi.reducer
  // add your other reducers here
});

// Reset all reducers when RESET_STORE is dispatched
const rootReducer = (state:any, action:any) => {
  if (action.type === RESET_STORE) {
    state = undefined; // This will reset the state of all reducers
  }

  return appReducer(state, action);
};

export default rootReducer;
