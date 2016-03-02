module.exports = (previousState,action)=>{
  if (action.type === 'DISPLAY_MESSAGES'){
    return {messages:action.messages};
  }
};