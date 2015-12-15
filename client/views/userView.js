var UserView = Backbone.View.extend({
  render: function(){
    var $userDiv = $('<div class="user"></div>');
    var $userSpan = $('<span class="username"></span>');
    $userSpan.text(this.model.attributes.name);
    
    var $attrDiv = $('<div class="userattributes"></div>')
    var $genderSpan = $('<span class="gender"></span>');
    if (this.model.attributes.gender){
      $genderSpan.text(this.model.attributes.gender === 'male' ? 'Male' : 'Female');
     // console.log(this.model.attributes.confidence)
    } else $genderSpan.text('Bad Picture or Ugly Subject');
    $attrDiv.append($genderSpan);

    var $userImg = $('<img class="userpic">');
    $userImg.attr('src',this.model.attributes.image_url);
    
    var $likesDiv = $('<div class="likes"></div>');
    $likesSpan = $('<span class="likesCount"></span>');
    $likesSpan.text(this.model.attributes.likes);
    $likesDiv.append($likesSpan)

    var $likesForm = $('<form class="likesForm"</form>');
    var $plusButton = $('<input type="submit" value="1">');
    var $minusButton = $('<input type="submit" value="-1">');
    $likesForm.on('click',function(event){
      event.preventDefault();
    });
    var context = this;
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
    $userDiv.append($userSpan).append($attrDiv).append($userImg)
      .append($likesDiv).append($likesForm);
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
  }
});
