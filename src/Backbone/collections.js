(function(){
	var IdeaModel = Backbone.Model.extend({

	});

	var ProfileIdeaModel = Backbone.Model.extend({

	});

	var ProfileInterestModel = Backbone.Model.extend({

	});

	var TeamMateModel = Backbone.Model.extend({

	});


	/////////////////////////////////////////////
	//////							   ///////////////
	//////      COLLECTIONS            ////////////////////
	//////							   /////////////////////////
	//////////////////////////////////////////////////////////////////


	window.IdeaCollection = Backbone.Collection.extend({
		model: IdeaModel
	});

	window.ProfileIdeasCollection = Backbone.Collection.extend({
		model: ProfileIdeaModel
	});

	window.ProfileInterestCollection = Backbone.Collection.extend({
		model: ProfileInterestModel
	})

	window.TeamCollection = Backbone.Collection.extend({
		model: TeamMateModel
	})
	
})();