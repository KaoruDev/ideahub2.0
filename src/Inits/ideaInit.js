(function(){
	window.ideaInit = function(){

		var interestCollection = new ProfileInterestCollection();


		// First we need to figure out which idea viewer is looking at.
		// Then we can populate the page with the information.

		DB.getIdea(_.getURLParameter("ideaId"), function(ideaProfile){
			ideaProfile.el = ".ideaInfo";

			var ideaInfoView = new IdeaInfoView(ideaProfile);

			var interestListView = new InterestListView({
				collection: interestCollection,
				el: ".interestDisplay"
			});


			for(var i = 0; i < ideaProfile.interestList.length; i++){
				//if(ideaProfile.interestList[i] !== user.id){
				if(true){
					DB.getUser(ideaProfile.interestList[i], function(storedUser){
						interestCollection.add(storedUser);
					});
				}
			}

		})// End of DB.getIdea


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

	};// End of ideaInit

})();