module.exports = (previousState,action)=>{
  if (action.type === 'TOGGLE_MAILBOX'){
    return ({mailbox:!previousState.mailbox});
  }
};