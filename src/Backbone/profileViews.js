(function(){

	// Profile Bio View

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

	// Authored Views

	window.ProfileAuthorListView = Backbone.View.extend({
		initialize: function(options){
			this.listenTo(this.collection, "add", this.addNewIdea);
		},
		addNewIdea: function(newModel){
			var newAuthorIdea = new ProfileAuthorView({
				model: newModel
			});
			newAuthorIdea.render();
			$(this.el).append(newAuthorIdea.el);
		}
	});


	window.ProfileAuthorView = Backbone.View.extend({
		initialize: function(options){
			this.templateGen = _.getTemplate("userAuthorTemp");
		},

		render: function(){
			var newHtml = this.templateGen(this.model.toJSON());
			$(this.el).html(newHtml);
		}
	}); 


	// Profile Interest Views

	window.ProfileInterestListView = Backbone.View.extend({
		initialize: function(options){
			this.listenTo(this.collection, "add", this.addNewIdea);
		},

		addNewIdea: function(newModel){
			var newInterestIdea = new ProfileInterestView({
				model: newModel
			});
			$(this.el).append(newInterestIdea.el);
		}
	});

	window.ProfileInterestView = Backbone.View.extend({
		initialize: function(options){
			this.templateGen = _.getTemplate("userInterestTemp");
			this.render();
		},
		render: function(){
			var newHtml = this.templateGen(this.model.toJSON());
			$(this.el).html(newHtml);
		}
	})

})();