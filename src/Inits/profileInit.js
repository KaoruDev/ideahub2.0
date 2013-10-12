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
		});
		

		// create a view for ideas and interest




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