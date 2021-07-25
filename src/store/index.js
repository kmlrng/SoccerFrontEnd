import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import user from "./user";
import conversations from "./conversations";
import activeConversation from "./activeConversation";

const CLEAR_ON_LOGOUT = "CLEAR_ON_LOGOUT";

export const clearOnLogout = () => {
  return {
    type: CLEAR_ON_LOGOUT
  };
};

// custom reducer to send rootState to individual reducers
const rootReducer = (state = {}, action = {}) => {
  if (action.type === CLEAR_ON_LOGOUT) {
    // set state to initial state
    state = {};
  }
  return {
    user: user(state.user, action, state),
    // conversations: conversations(state.conversations, action, state),
    // activeConversation: activeConversation(state.activeConversation, action, state) 
  }
};

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
