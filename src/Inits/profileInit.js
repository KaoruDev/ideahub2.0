(function(){
	window.profileInit = function(){
		// We first need to figure out who's profile the view is looking at.
		// then based on that information we can populate the page.
		
		DB.getUser(_.getURLParameter("profileId"), function(profileUser){
			new ProfileBioView({
				el: ".userBio",
				profileInfo: {
					avatar: profileUser.userOb.avatar_url,
					email: profileUser.userOb.email,
					username: profileUser.userOb.username,
					profileUrl: profileUser.userOb.profileUrl
				}
			}).render();

			// collection and parent view for authored ideas

			var authorIdeas = new ProfileIdeasCollection();

			var profileAuthorListView = new ProfileAuthorListView({
				collection: authorIdeas,
				el: ".authorIdeas"
			})

			//collection and parent view for intersted ideas

			var interestIdeas = new ProfileIdeasCollection();

			var profileInterestListView = new ProfileInterestListView({
				collection: interestIdeas,
				el: ".userInterests"
			})

			DB.getAllIdeas(function(storedIdea){
				if(profileUser.authorList.indexOf(storedIdea.ideaId) > -1){
					var info = {
						ideaTitle: storedIdea.ideaTitle,
						ideaId: storedIdea.ideaId,
						ideaDesc: storedIdea.ideaDesc,
						numWanted: storedIdea.numWanted
					};
					authorIdeas.add(info);
					
				}else if(profileUser.iList.indexOf(storedIdea.ideaId) > -1){
					var info = {
						avatar: storedIdea.avatar,
						author: storedIdea.author,
						authorId: storedIdea.authorId,
						ideaId: storedIdea.ideaId,
						ideaTitle: storedIdea.ideaTitle,
						ideaDesc: storedIdea.ideaDesc
					};
					interestIdeas.add(info);

					
				}

			});// End of DB.getAllIdeas

		}); //End of DB.getUser
		


//*************************************************************//
//***************** BUTTON TRIGGERS **************************//
//***********************************************************//
		
		$(document).on("click", ".myProfile", function(e){
			e.preventDefault;
			window.location.assign("profile.html?profileId=" + user.id)
		});

		$(".logout").on("click", function(evt){
			evt.preventDefault;
			auth.logout();
		});


	};//End of Profile Init.

})();