var reducers = [
  require('./users.jsx'),
  require('./messages.jsx'),
  require('./loggedin.jsx'),
  require('./vote.jsx'),
  require('./addUser.jsx'),
  require('./toggleMailbox.jsx')
];

module.exports = (previousState, action)=>{
  return reducers.map(reducer=>{
    return reducer(previousState,action);
  }).reduce((a,b)=>{
    return Object.assign({},a,b);
  },previousState);
};
