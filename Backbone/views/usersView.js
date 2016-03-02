var UsersView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('sync',this.addAll,this);
    this.collection.fetch();
  },

  render: function(){
    return this.$el.html('');
  },

  addAll: function(){
    this.render();
    this.collection.forEach(this.addOne,this);
    if (!document.cookie){
      $('.likesForm').hide();
      $('.messageDiv').hide();
    }
  },

  addOne: function(item){
    var view = new UserView({model:item});
    this.$el.append(view.render().el);
  }

});
