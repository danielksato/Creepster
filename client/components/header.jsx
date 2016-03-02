var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var store = require('../store/store.jsx');
var Actions = require('../actions/actions.jsx')

var Header = React.createClass({
  showLoginForm(){
    return (
      <div className="loginForm">
        <form onSubmit={this.login}>
          <input ref="url" placeholder="URL"/>
          <input ref="username" placeholder="Username"/>
    
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  },
  showNavLinks(){
    if (this.props && this.props.username){
      return (
        <div className = "navLinks">
          <span className="messages" 
            onClick={this.toggleMailbox}>Messages</span>
          <span className="logout" onClick={this.logout}>Log Out</span>
        </div>
      );
    } else return (
      <div className = "navLinks">
        <span className="loginReminder">
          Enter an image URL to vote and send messages.
        </span>
      </div>
      );
  },
  toggleMailbox(){
    store.dispatch(Actions.TOGGLE_MAILBOX());
  },
  login(e){
    e.preventDefault();
    store.dispatch(Actions.SET_LOGGEDIN(this.refs.username.value));
    $.ajax({
      method: 'POST',
      url: 'http://'+document.location.host,
      data: {
        username: this.refs.username.value,
        url: this.refs.url.value
      }
    }).then(data=>{
      store.dispatch(Actions.ADD_USER(data));
    }).fail((err)=>{
      this.logout();
      throw new Error(err);
    });
    this.refs.username.value = this.refs.url.value = '';
  },
  logout(){
    document.cookie = null;
    store.dispatch(Actions.SET_LOGGEDIN(null));
  },
  componentDidMount(){
    if (document.cookie) {
      var name = document.cookie.split('=')[1];
      store.dispatch(Actions.SET_LOGGEDIN(name));
    };
  },
  shouldComponentUpdate(newProps){
    return true;
  },
  render(){
    return (
      <div className="nav">
      <h1 className="home">Creepster</h1>
      <h3>Dating for Horrible People</h3>
      <h5>{this.props.username || ''}</h5>
      {this.showLoginForm()}
      {this.showNavLinks()}
      </div>
    );
  }
});

module.exports = ReactRedux.connect(state=>{return state})(Header);