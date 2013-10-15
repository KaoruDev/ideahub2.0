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
				$(this.el).find(".interestBtn").text("Opted in!");
				$(this.el).find(".interestBtn").removeClass("interestBtn");
			}
		},

		userInterest: function(button){
			var self = this;

			$(self.el).find(".interestBtn").text("Opted in!");
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
			this.templateGen = _.getTemplate(this.model.get("useTemplate"));
			this.render();
		},

		events: {
			"click .pickMate": "selectMate",
			"click .removeMate": "removeMate"
		},

		render: function(){
			var newHtml = this.templateGen(this.model.toJSON());
			$(this.el).html(newHtml);

			var teamList = this.model.get("ideaOb").teamMembers;

			if(teamList){
				for(var i = 0; i < teamList.length; i++){
					if(teamList[i] == this.model.get("userOb").id){
						$(this.el).find('.pickMate').addClass("removeMate");
						$(this.el).find(".pickMate").removeClass("pickMate");
						$(this.el).find(".removeMate").html("Remove");
					}
				}
			}
		},

		selectMate: function(e){
			var self = this;

			var ideaId = _.getURLParameter("ideaId");

			DB.getIdea(ideaId, function(storedIdea){
				if(storedIdea.teamMembers){
					storedIdea.teamMembers.push(self.model.get("userOb").id)
				}else{
					storedIdea.teamMembers = [self.model.get("userOb").id]
				}

				DB.setIdea(storedIdea.ideaId, storedIdea);	
			});

			$(this.el).find('.pickMate').addClass("removeMate");
			$(this.el).find(".pickMate").removeClass("pickMate");
			$(this.el).find(".removeMate").html("Remove");
		},

		removeMate: function(e){
			var self = this;
			var ideaId = _.getURLParameter("ideaId");

			DB.getIdea(ideaId, function(storedIdea){
				storedIdea.teamMembers.splice(storedIdea.teamMembers.indexOf(self.model.get("userOb").id));
				DB.setIdea(ideaId, storedIdea)
			});


			$(this.el).find('.removeMate').addClass("pickMate");
			$(this.el).find(".removeMate").removeClass("removeMate");
			$(this.el).find(".pickMate").html("Select");
		}	
	});


	window.TeamListView = Backbone.View.extend({
		initialize: function(options){
			this.listenTo(this.collection, "add", this.addTeamMate);
		},
		addTeamMate: function(newModel){
			var teamMateView = new TeamMateView({
				model: newModel
			});
			$(this.el).append(teamMateView.el);
		}
	});

	window.TeamMateView = Backbone.View.extend({
		initialize: function(options){
			this.templateGen = _.getTemplate("teamMateTemp")
			this.render();
		},

		render: function(){
			var newHtml = this.templateGen(this.model.toJSON().userOb);
			$(this.el).html(newHtml);
		}
	});

})();