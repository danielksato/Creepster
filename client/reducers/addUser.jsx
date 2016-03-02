module.exports = (previousState,action)=>{
  if (action.type === 'ADD_USER'){
    return {users:[action.user].concat(previousState.users || [])};
  }
}