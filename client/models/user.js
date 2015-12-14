var User = Backbone.Model.extend({
  initialize: function(){
    if (this.attributes.photoData.photos.length){
      if (this.attributes.photoData.photos[0].tags.length){
        this.attributes.gender = this.attributes.photoData.photos[0].tags[0].attributes.gender.value;
        this.attributes.confidence = this.attributes.photoData.photos[0].tags[0].attributes.gender.confidence;
      }
    }
  }
});
