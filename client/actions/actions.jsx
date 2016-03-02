module.exports = {
  ADD_USER(user){
    return {
      type: 'ADD_USER',
      user: user
    };
  },
  SET_LOGGEDIN: function(name){
    return {
      type: 'SET_LOGGEDIN',
      username: name
    };
  },
  GET_USERS(users){
    return {
      type: 'GET_USERS',
      users: users
    };
  },
  VOTE(val,index){
    return {
      type: 'VOTE',
      val: val,
      index: index
    };
  },
  TOGGLE_MAILBOX(){
    return {
      type: 'TOGGLE_MAILBOX',
    };
  },
  DISPLAY_MESSAGES(messages){
    return {
      type: 'DISPLAY_MESSAGES',
      messages: messages
    };
  },
  DELETE_MESSAGE(id){
    return {
      type: 'DELETE_MESSAGE',
      id: id
    };
  }
};