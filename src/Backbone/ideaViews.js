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
			self.options.interestList.push(user.id);

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


	window.IdeaInterestView = Backbone.View.extend({

	});

	window.InterestedUserView = Backbone.View.extend({

	});

})();