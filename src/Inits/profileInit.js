(function(){
	window.profileInit = function(){
		// create a view for bio
		var getURLParameter = function(name) {
		    return decodeURI(
		        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
		    );
		}

		DB.getUser(getURLParameter("profileId"), function(profileUser){
			new ProfileBioView({
				el: ".userBio",
				profileInfo: {
					avatar: profileUser.userOb.avatar_url,
					email: profileUser.userOb.email,
					username: profileUser.userOb.username,
					profileUrl: profileUser.userOb.profileUrl
				}
			}).render();

			// create a view for ideas and interest

			var profileIdeas = new ProfileIdeasCollection();

			var profileIdeaListView = new ProfileIdeasListView({
				collection: profileIdeas,
				el: ".userIdeas"
			})

			DB.getAllIdeas(function(storedIdea){
				if(false){
					console.log("I authored!");

				}else if(profileUser.iList.indexOf(storedIdea.ideaId) > -1){
					console.log("I interested!");
					console.log("ilist", profileUser.iList);
					console.log("idea id", storedIdea.ideaId)
					console.log(profileUser.iList.indexOf(storedIdea.ideaId));
				}
				profileIdeas.add(storedIdea);
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


	}

})();