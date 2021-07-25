export const addMessageToStore = (state, payload, rootState) => {
  const { message, sender } = payload;

  //  If the message is not relevant for the user then do nothing
  if (
    !(
      message.recipientId === rootState.user.id ||
      message.senderId === rootState.user.id
    )
  ) {
    return state;
  }

  let existingConversation = state.find(
    (convo) => convo.id === message.conversationId
  );
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (!existingConversation && sender !== null) {
    // Remove convo if the user2 is in search list and thus having no conversation id, but user2 sends a message.
    state = state.filter((convo) => convo.otherUser.id !== sender.id);
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      // same message cannot occur twice.
      if (convoCopy.messages[convoCopy.messages.length - 1].id === message.id)
        return convo;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const updateConversationToStore = (state, conversation) => {
  return state.map((convo) => {
    if (convo.id === conversation.id) {
      return { ...conversation };
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};
