module.exports = (previousState,action)=>{
  if (action.type === 'ADD_USER'){
    console.log(action.user);
    return {users:[action.user].concat(previousState.users || [])};
  }
}