var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var store = require('../store/store.jsx');
module.exports = React.createClass({
  delete(){
    $.ajax({
      method: 'POST',
      url: 'http://'+window.location.host+'/messages/delete',
      data: {
        id: this.props.message.id
      }
    }).then(()=>{
      $.ajax({
        method: 'GET',
        url: 'http://'+window.location.host+'/messages'
      }).then(data=>{
        store.dispatch(Actions.DISPLAY_MESSAGES(data))
      }).fail(err=>{
        throw new Error(err);
      });
    }).fail(err=>{
      throw new Error(err);
    });
  },
  render(){
    return(
      <div className="messageBox">
        <span className="messageSender">{this.props.message.from_user}</span>
        <p className="messageText">{this.props.message.text}</p>
        <button className="delete" onClick={this.delete}>Delete</button>
      </div>
    );
  }
})