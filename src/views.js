(function(){
	window.ListView = Backbone.View.extend({
		initialize: function(){
			this.listenTo(this.collection, "add", this.addIdea)
		},
		addIdea: function(newModel){
			var indiIdeaView = new IdeaView({ model: newModel });

			indiIdeaView.render();
			$(this.el).append(indiIdeaView.el);
		}
	});

	window.IdeaView = Backbone.View.extend({
		initialize: function(){
			this.templateFiller = _.getTemplate("idea");
		},
		render: function(){
			var newHtml = this.templateFiller(this.model.toJSON());
		
			$(this.el).html(newHtml);
		}
	})
})();