var UserView = Backbone.View.extend({
  render: function(){
    var context = this;
    var $userDiv = $('<div class="user"></div>');
    var $userSpan = $('<span class="username"></span>');
    $userSpan.text(this.model.attributes.name);
    
    var $attrDiv = $('<div class="userattributes"></div>')
    var $genderSpan = $('<span class="gender"></span>');
    if (this.model.attributes.gender){
      $genderSpan.text(this.model.attributes.gender === 'male' ? 'Male' : 'Female');
    } else $genderSpan.text('Bad Picture or Ugly Subject');
    $attrDiv.append($genderSpan);

    var $userImg = $('<img class="userpic">');
    $userImg.attr('src',this.model.attributes.image_url);
    
    var $likesDiv = $('<div class="likes"></div>');
    $likesSpan = $('<span class="likesCount"></span>');
    $likesSpan.text(this.model.attributes.likes+' Likes');
    $likesDiv.append($likesSpan)

    var $likesForm = $('<form class="likesForm"</form>');
    var $plusButton = $('<input class="voteButton" type="submit" value="+">');
    var $minusButton = $('<input class="voteButton" type="submit" value="-">');
    $likesForm.on('click',function(event){
      event.preventDefault();
    });
    $plusButton.on('click',function(){
      context.addLike(1).then(function(){
        context.model.collection.fetch().then(function(){
          context.render(); 
        })
      });
    });
    $minusButton.on('click',function(){
      context.addLike(-1).then(function(){
        context.model.collection.fetch().then(function(){
          context.render();
        });      
      });
    });
    $likesForm.append($plusButton).append($minusButton);
    
    $messageDiv = $('<div class="messageDiv"></div>');
    $messageForm = $('<form class="messageForm"></form>');
    $messageTextBox = $('<input type="text" class="messageText '+this.model.attributes.id+'" placeholder="Send a Message"></input>');
    //This is a hack so I can bind the event listener.
    $messageForm.append($messageTextBox);
    $messagePlaceHolder = $('<p class="noMessage"></p>');
    $messagePlaceHolder.text('Messages are only for smiling users.');
    $messageDiv.append(this.model.attributes.smiling ? $messageForm : $messagePlaceHolder);

    $messageForm.on('submit',function(event){
      event.preventDefault();
      context.sendMessage($('.'+context.model.attributes.id).val()).then(function(){
        context.model.collection.fetch().then(function(){
          context.render();
        });
      });
    });

    $userDiv.append($userSpan).append($attrDiv).append($userImg)
      .append($likesDiv).append($likesForm).append($messageDiv);
    this.$el.html($userDiv);
    return this;
  },

  addLike : function(n){
    return $.ajax({
      method: 'POST',
      url: '/likes/',
      contentType: 'application/json',
      data: JSON.stringify({value: n,
             name: this.model.attributes.name})
    });
  },

  sendMessage: function(str){
    console.log(str);
    return $.ajax({
      method: 'POST',
      url: '/messages',
      contentType: 'application/json',
      data: JSON.stringify({
        message: str,
        toName: this.model.attributes.name
      })
    });
  }
});
