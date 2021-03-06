//(function(){
	var myFireBase = new Firebase("https://046223cc8c28a13be29030bdd5f81d8aa49ac114.firebaseio.com/");


	var urlArray = window.location.pathname.split( '/' )
		, pageLocation = urlArray[urlArray.length - 1]
	;

	window.auth = new FirebaseSimpleLogin(myFireBase, function(error, user) {
		if (error) {
		// an error occurred while attempting login
			console.log(error);
		} else if (user) {
			// user authenticated with Firebase
			window.user = user

			// once logged-in transfer user to user.html.
			if(pageLocation === "index.html" || pageLocation === ""){
				window.location.assign("user.html");
			}
			// if user is new to page, record her info.
			recordNewUser();
			route();

			$(".hello").text("Welcome, " + user.username)
		} else {
			// Redirects users who have not logged in.
			if(pageLocation !== "index.html" ){
				window.location.assign("index.html");
			}

			$(".login").on("click", function(evt){
					evt.preventDefault;
					auth.login("github");
			});
			listInit();
		}
	});


	var route = function(){
		switch(pageLocation){
			case "user.html":
				listInit();
				break;
			case "form.html":
				var urlParams = _.getURLParameter("ideaId");
				if(urlParams !== "null"){
					formEditInit(urlParams);
				}else{
					formInit();
				}
				break;
			case "profile.html":
				profileInit();
				break;
			case "idea.html":
				ideaInit();
				break;
			default:
				break;
		}
	}



//**************   HELPER FUNCTIONS ***********************//

	var recordNewUser = function(){
		DB.getUser(user.id, function(returnUser){

			if(returnUser === null){
				DB.setUser(user.id, {
					userOb: user,
					authorList: [-1], //firebase does not accept empty arrays
					iList: [-1]
				});
			}
		});
	};


//})();