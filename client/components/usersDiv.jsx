var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var $ = require('jquery');
var store = require('../store/store.jsx');
var Actions = require('../actions/actions.jsx');
var UserTile = require('./userTile.jsx');

var UsersDiv = React.createClass({
  getInitialState(){
    return store.getState();
  },
  getUsers(){
    $.ajax({
      method: 'GET',
      url: 'http://'+window.location.host+'/users',
    }).then(data=>{
      store.dispatch(Actions.GET_USERS(data));
    }).fail(err=>{
      throw new Error(err);
    });
  },
  componentDidMount(){
    this.getUsers();
    window.refresh = setInterval(()=>{this.getUsers()},10000);
  },
  componentWillUnmount(){
    clearInterval(window.refresh);
  },
  renderUserTiles(){
    if (this.props && this.props.users) {
      return this.props.users.map((user,index)=>{
        return <UserTile key={user.id} user={user} index={index}/>
      });
    } else return <div/>;
  },
  shouldComponentUpdate(newprops){
    if (newprops.users && this.props.users){
      return !newprops.users.every((user,index)=>{
        return user.id === this.props.users[index].id;
      });
    };
    return true;
  },
  render(){
    return (
      <div className='main'>
        {this.renderUserTiles()}
      </div>
    );
  }
});

module.exports = ReactRedux.connect(state=>{return state})(UsersDiv);