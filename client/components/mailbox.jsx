var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var $ = require('jquery');
var store = require('../store/store.jsx');
var Actions = require('../actions/actions.jsx');
var MessageTile = require('./messageTile.jsx');

var Mailbox = React.createClass({
  renderMessages(){
    if (this.props.messages){
      return this.props.messages.map(message=>{
        return <MessageTile message={message} key={message.id}/>;
      });
    } else return <div/>
  },
  getMessages(){
    $.ajax({
      method: 'GET',
      url: 'http://'+window.location.host+'/messages',
    }).then(data=>{
      store.dispatch(Actions.DISPLAY_MESSAGES(data));
    }).fail(err=>{
      throw new Error(err);
    });
  },
  sendMessage(e){
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'http://'+document.location.host+'/messages',
      data: {
        message: this.refs.messageText.value
      }
    }).fail(err=>{
      throw new Error(err);
    });
    this.refs.messageText.value = '';
  },
  closeInbox(){
    store.dispatch(Actions.TOGGLE_MAILBOX());
  },
  componentDidMount(){
    this.getMessages();
    window.refreshMessages = setInterval(()=>{this.getMessages()},10000);
  },
  componentWillUnmount(){
    clearInterval(window.refreshMessages);
  },
  shouldComponentUpdate(newprops){
    return true;
  },
  render(){
    if (this.props.mailbox) {
      return (
        <div className="inbox">
          <h1>{'Inbox'}</h1>
          <span className="closeInbox" onClick={this.closeInbox}>Close</span>
          {this.renderMessages()}
        </div>);
    } else return <div/>
  },
})

module.exports = ReactRedux.connect(state=>{return state})(Mailbox);