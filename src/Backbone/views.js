//(function(){
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

		events: {
			"click .interestBtn": "userInterest",
			"click .login": "login"
		},

		render: function(){
			var newHtml = this.templateFiller(this.model.toJSON());

			$(this.el).html(newHtml);

			if(window.user && isUserInterested(this.model.get("interestList"))){
				$(this.el).find(".interestBtn").text("All in!");
				$(this.el).find(".interestBtn").removeClass("interestBtn");
			}

		},

		login: function(){
			auth.login("github");
		},

		userInterest: function(button){
			var self = this;

			$(this.el).find(".interestBtn").text("All in!");
			$(this.el).find(".interestBtn").removeClass("interestBtn");
			
			//Update idea info on DB
			var newInterestList = this.model.get("interestList");
			newInterestList.push(user.id)
			this.model.set({ interestList: newInterestList });
			DB.setIdea(this.model.get("ideaId"), this.model.toJSON(), this.model.get("priority"));

			//Update user info on DB
			DB.getUser(user.id, function(DBuser){
				DBuser.iList.push(self.model.get("ideaId"));
				DB.setUser(user.id, DBuser);
			})

		}
	});


//*************************************************************//
//***************  HELPER FUNCTIONS **************************//
//***********************************************************//


var isUserInterested = function(interestList){
	return interestList.indexOf(user.id) >= 0;
};

//})();