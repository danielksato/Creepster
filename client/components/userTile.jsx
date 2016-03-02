var React = require('react');
var ReactDOM = require('react-dom');
var store = require('../store/store.jsx');
var MessageBox = require('./messageBox.jsx');
var VoteButtons = require('./voteButtons.jsx');

module.exports = React.createClass({
  getGender(){
    if (this.props.user.gender){
      return this.props.user.gender === 'male' ? "Male" : 'Female';
    } else return 'Bad Picture or Ugly Subject';
  },
  render(){
    return (
      <div className="user">
        <span className="username">{this.props.user.name}</span>
        <div className="userattributes">
          <span className="gender">{this.getGender()}</span>
        </div>
        <img className="userpic" src={this.props.user.image_url}/>
        <VoteButtons user={this.props.user} index={this.props.index}/>
        <MessageBox sender={this.props.username} user={this.props.user}/>
      </div>
    );
  }
})