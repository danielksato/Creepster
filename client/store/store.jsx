var redux = require('redux');
var reducer = require('../reducers/reducer.jsx');

module.exports = redux.createStore(reducer,{});