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
			"click .interestBtn": "userInterest"
		},

		render: function(){
			var newHtml = this.templateFiller(this.model.toJSON());

			$(this.el).html(newHtml);
			if(isUserInterested(this.model.get("interestList"))){
				console.log("this running?")
				$(this.el).find(".interestBtn").text("All in!");
				$(this.el).find(".interestBtn").removeClass("interestBtn");
			}

		},

		userInterest: function(button){
			$(this.el).find(".interestBtn").text("All in!");
			$(this.el).find(".interestBtn").removeClass("interestBtn");
			console.log("once!");
		}
	});


//*************************************************************//
//***************  HELPER FUNCTIONS **************************//
//***********************************************************//


var isUserInterested = function(interestList){
	return interestList.indexOf(user.id) >= 0;
};

//})();