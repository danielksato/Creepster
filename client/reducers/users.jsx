module.exports = (previousState,action)=>{
  if (action.type === 'GET_USERS'){
    return {users:action.users};
  } 
};