var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var $ = require('jquery');

var MessageBox = React.createClass({
  sendMessage(e){
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'http://'+document.location.host+'/messages',
      data: {
        toName: this.props.user.name,
        message: this.refs.messageText.value
      }
    }).fail(err=>{
      throw new Error(err);
    });
    this.refs.messageText.value = '';
  },
  render(){
    if (this.props.username && this.props.users.filter(user=>{
      return user.name === this.props.username && user.smiling;
    }).length){
      return(
        <div className="messageDiv">
          <form className="messageForm" onSubmit={this.sendMessage}>
            <input type="text" className="messageText" 
              placeholder="Send a Message" ref="messageText"/>
          </form>
        </div>
      );
    } else if (this.props.username){
      return (
        <div className="messageDiv">
          <p className="noMessage">{'Messages are only for smiling users.'}</p>
        </div>
      );
    } else return <div/>;
  }
});

module.exports = ReactRedux.connect(state=>{return state})(MessageBox);