module.exports = (previousState,action) => {
  if (action.type === 'SET_LOGGEDIN'){
    return {username:action.username};
  };
};