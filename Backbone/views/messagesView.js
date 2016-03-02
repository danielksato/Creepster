var MessagesView = Backbone.View.extend({
  initialize: function(){
    console.log('initialized');
    this.collection.on('sync',this.addAll,this);
    this.collection.fetch();
  },

  render: function(){
    return this.$el.html('');
  },

  addAll: function(){
    console.log('collection :'+this.collection.length);
    this.render();
    this.collection.forEach(this.addOne,this);
  },

  addOne: function(item){
    var view = new MessageView({model:item});
    this.$el.append(view.render().el);
  }

});
