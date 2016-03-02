var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var $ = require('jquery');
var Actions = require('../actions/actions.jsx');
var store = require('../store/store.jsx');
var VoteButtons = React.createClass({
  vote(e){
    e.preventDefault();
    var increment = e.target.value === '+' ? 1 : -1;
    console.log(increment)
    $.ajax({
      method: 'POST',
      url: 'http://'+window.location.host+'/likes',
      data: {
        name: this.props.username,
        value: increment
      }
    }).fail(err=>{
      throw new Error(err);
    });
    store.dispatch(Actions.VOTE(increment,this.props.index));
  },
  shouldComponentUpdate(newprops){
    return newprops.users && newprops.users.every(user=>{
      return user && user.likes;
    });
  },
  render(){
    if (this.props.username){
      return(
        <div className="likes">
          <span className="likesCount">
            {this.props.users[this.props.index].likes+' Likes'}
          </span>
          <form className="likesForm">
            <input className="voteButton" type="submit" 
              value='+' onClick={this.vote}/>
            <input className="voteButton" type="submit" 
              value='-' onClick={this.vote}/>
          </form>
        </div>
      );
    } else return <div/>
  }
});

module.exports = ReactRedux.connect(state=>{
  return state},()=>{return {}},(stateProps,dispatchProps,ownProps)=>{
    return Object.assign({},stateProps,ownProps);
  })(VoteButtons);