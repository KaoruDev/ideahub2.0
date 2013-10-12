(function(){
	window.ideaInit = function(){

		// First we need to figure out which idea viewer is looking at.
		// Then we can populate the page with the information.

		DB.getIdea(_.getURLParameter("ideaId"), function(ideaProfile){
			console.log(ideaProfile);


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