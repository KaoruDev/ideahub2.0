(function(){

	window.formInit = function(){
		$(document).on("click", ".ideaSubmit", function(e){
			e.preventDefault();
			ideaSubmit()
		});

		tinymce.init({
			selector: "textarea",
			plugins: [""],
			menubar: false,
			statusbar: false,
			toolbar: "bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent" 
		});
	};

	var ideaSubmit = function(){
		if(formValid()){
			var ideaTitle = $(".ideaTitle").val()
				, ideaDesc = tinymce.get("ideaDesc").getContent()
				, numWanted = parseInt($(".numWanted").val())
				, recordSuccess = 0
				, ideaCounter
			;

			var recorded = function(){
				recordSuccess ++;
				if (recordSuccess === 2){
					ideaCounter++;
					DB.setCounter(ideaCounter);
					window.location.assign("user.html");
				}
			};

			var addIdea = function(counter){
				ideaCounter = counter;

				DB.setIdea(ideaCounter.toString(), {
					author: user.username,
					authorId: user.id,
					avatar: user.avatar_url,
					ideaTitle: ideaTitle, 
					ideaDesc: ideaDesc,
					ideaId: ideaCounter,
					interestList: [user.id],
					numWanted: numWanted
				}, 99999);

				recorded();
				DB.getUser(user.id, updateUser);
			};

			// Gets the idea counter and sends a callback function which it calls once data is recevied.
			DB.getCounter(addIdea); 


			var updateUser = function(author){
				author.authorList.push(ideaCounter);
				author.iList.push(ideaCounter);

				DB.setUser(user.id, author);

				recorded();
			};

			// Gets user object from database and returns data via updateUser
		}
	};


	var formValid = function(){
		var valid = true;
		if($(".ideaTitle").val() === ""){
			$(".ideaTitle").addClass("error");
			valid = false;
		}
		if(isNaN(parseInt($(".numWanted").val()))){
			$(".numWanted").addClass("error");
			$(".numWanted").val("");
			valid = false;
		}
		if($(".desiredSkills").val() === ""){
			$(".desiredSkills").addClass("error");
			valid = false;
		}
		if(!(tinyMCE.activeEditor.isDirty())){
			alert("Don't forget your project description!")
			valid = false;
		}

		return valid;
	}

})();