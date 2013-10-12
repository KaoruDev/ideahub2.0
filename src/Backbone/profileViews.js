(function(){
	window.ProfileBioView = Backbone.View.extend({
		initialize: function(options){
			this.profileInfo = options.profileInfo
			this.template = _.getTemplate("bioTemp");
		},

		render: function(){
			var newHtml = this.template(this.profileInfo);
			$(this.el).html(newHtml);
		}
	});

	window.ProfileIdeasListView = Backbone.View.extend({
		initialize: function(options){
			this.listenTo(this.collection, "add", this.addNewIdea)
		},
		addNewIdea: function(newModel){
			console.log(newModel);
		}
	}) 

})();