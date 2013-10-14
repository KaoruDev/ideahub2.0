(function(){
	// Idea Info View

	window.IdeaInfoView = Backbone.View.extend({
		initialize: function(){
			this.templateGen = _.getTemplate("ideaInfoTemp");
			this.render();
		},

		events: {
			"click .interestBtn": "userInterest"
		},

		render: function(){
			var newHtml = this.templateGen(this.options);
			$(this.el).html(newHtml);

			if(window.user && (this.options.interestList.indexOf(user.id) >= 0)){
				$(this.el).find(".interestBtn").text("All in!");
				$(this.el).find(".interestBtn").removeClass("interestBtn");
			}
		},

		userInterest: function(button){
			var self = this;

			$(self.el).find(".interestBtn").text("All in!");
			$(self.el).find(".interestBtn").removeClass("interestBtn");
			
			//Update idea info on DB
			self.options.interestList.push(user);

			DB.setIdea(self.options.ideaId, self.options, self.options.priority);

			//Update user info on DB
			DB.getUser(user.id, function(DBuser){
				DBuser.iList.push(self.options.ideaId);
				DB.setUser(user.id, DBuser);
			})

		}
	});


	// Team Members Views TBA...

	// Folks who are interested views


	window.InterestListView = Backbone.View.extend({
		initialize: function(options){
			this.listenTo(this.collection, "add", this.addInterestView);
		},
		addInterestView: function(newModel){
			var interestView = new InterestedUserView({
				model: newModel
			});
			$(this.el).append(interestView.el);
		}
	});

	window.InterestedUserView = Backbone.View.extend({
		initialize: function(options){
			this.templateGen = _.getTemplate("interestView");
			this.render();
		},

		events: {
			"click .interestedUser" : "navigateToProfile"
		},

		render: function(){
			console.log(this.model.toJSON())
			var newHtml = this.templateGen(this.model.toJSON());
			$(this.el).html(newHtml);
		},

		navigateToProfile: function(){
			window.location.assign("profile.html?profileId=" + this.model.get("userOb").id)
		}
	});

})();