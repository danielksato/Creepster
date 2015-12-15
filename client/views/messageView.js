var MessageView = Backbone.View.extend({
  render: function(){
    var context = this;
    var $messageDiv = $('<div class="messageBox" id="'+this.model.attributes.id+'"></div>');
    var $userSpan = $('<span class="messageSender"></span>');
    $userSpan.text(this.model.attributes.from_user);
    var $textP = $('<p class="messageText"></p>');
    $textP.text(this.model.attributes.text);
    $deleteSpan = $('<button class="delete"></button>');
    $deleteSpan.text('Delete');
    $deleteSpan.on('click',function(){
      context.deleteMessage(context.model.attributes.id).then(function(){
        context.model.collection.fetch().then(function(){
          context.render();
        });
      })
    })
    $messageDiv.append($userSpan).append($textP).append($deleteSpan);
    this.$el.html($messageDiv);
    return this;
  },
  deleteMessage: function(id){
    return $.ajax({
      method: 'POST',
      url: '/messages/delete',
      contentType: 'application/json',
      data: JSON.stringify({
        id: this.model.attributes.id
      })
    });
  }
});
