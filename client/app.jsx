var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var Header = require('./components/header.jsx');
var Users = require('./components/usersDiv.jsx');
var Mailbox = require('./components/mailbox.jsx');
var store = require('./store/store.jsx');

var App = React.createClass({
  render(){
    return (
      <div id='app'>
        <Mailbox/>
        <Header/>
        <Users/>
      </div>
    );
  }
});

ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
),document.getElementById('app'));