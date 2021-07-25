import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import {applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const enhancers = compose(
  applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  );

 

export default configureStore({
  reducer: {
    user: userReducer,
  },
  enhancers
});
