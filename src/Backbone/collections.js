(function(){
	window.IdeaCollection = Backbone.Collection.extend({
		model: IdeaModel
	});

	window.ProfileIdeasCollection = Backbone.Collection.extend({
		model: ProfileIdeaModel
	});
	
})();