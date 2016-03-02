module.exports = (previousState,action)=>{
  if (action.type === 'VOTE') {
    var newState = {
      users:JSON.parse(JSON.stringify(previousState.users || []))
    };
    if (newState.users[action.index]){
      newState.users[action.index].likes += action.val;
    }
    return newState;
  }
};