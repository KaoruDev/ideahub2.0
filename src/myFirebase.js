//(function(){
	var myFireBase = new Firebase("https://ideahub2.firebaseio.com")
		, fireBUsers = myFireBase.child("users")
		, fireBIdeas = myFireBase.child("ideas")
		, fireBUser
		, currentUser
	;

	window.DB = {
		getIdea: function(id, callback){
			fireBIdeas.child(id).once("value",function(snapshot){
				var idea = snapshot.val();
				callback(idea);
			})
		},

		getAllIdeas: function(callback){
			fireBIdeas.on("child_added", function(snapshot){
				var users = snapshot.val();
				callback(users);
			});

		},

		setIdea: function(ideaId, ideaObj){
			fireBIdeas.child(ideaId).set(ideaObj);
		},

		getUser: function(id, callback){
			fireBUsers.child(id).once("value", function(snapshot){
				var user = snapshot.val();
				callback(user);
			})
		},


		setUser: function(id, userObj){
			fireBUsers.child(id).set(userObj);
		},

		getCounter: function(callback){
			myFireBase.child("ideaCounter").once("value", function(snapshot){
				var counter = snapshot.val()
				callback(counter);
			})
		},

		setCounter: function(num){
			myFireBase.child("ideaCounter").set(num);
		}
	}

//})();