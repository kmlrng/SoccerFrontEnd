import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  updateConversationToStore,
} from "./utils/reducerFunctions";

// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";
// ACTION CREATORS

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};
// add new conversation when sending a new message
export const updateConversation = (conversation) => {
  return {
    type: UPDATE_CONVERSATION,
    payload: conversation,
  };
};

// REDUCER

const reducer = (state = [], action, rootState) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload, rootState);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case UPDATE_CONVERSATION: {
      return updateConversationToStore(state, action.payload);
    }

    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    default:
      return state;
  }
};

// Added a wrapper on reducer so whenever state changes we automatically have the latest conversation on top
const conversationReducerWrapper = (state = [], action, rootState) => {
  let conversations = reducer(state, action, rootState);
  // Whenever a new message is received, sort the conversations (it is optimized as the sorting happens only at a conversation level by the last message sent)
  return conversations.sort((convA, convB) => {
    if (convA.messages.length === 0) {
      return -1;
    }
    if (convB.messages.length === 0) {
      return 1;
    }

    let messageA = convA.messages[convA.messages.length - 1];
    let messageB = convB.messages[convB.messages.length - 1];
    return messageA.createdAt < messageB.createdAt ? 1 : -1;
  });
};

export default conversationReducerWrapper;