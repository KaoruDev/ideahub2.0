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

	var ideaSubmit = function(ideaId){
		if(formValid()){
			var ideaTitle = $(".ideaTitle").val()
				, ideaDesc = tinymce.get("ideaDesc").getContent()
				, numWanted = parseInt($(".numWanted").val())
				, recordSuccess = 0
				, ideaCounter = ideaId
				, newIdea = true
			;

			var recorded = function(){
				recordSuccess ++;
				if (recordSuccess === 2 && newIdea){
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
					ideaId: ideaCounter.toString(),
					interestList: [user.id],
					numWanted: numWanted
				});

				recorded();

				DB.getUser(user.id, updateUser);

			};

			var updateIdea = function(ideaId){
				DB.getIdea(ideaId, function(storedIdea){
					storedIdea.ideaDesc = ideaDesc;
					storedIdea.ideaTitle = ideaTitle;
					storedIdea.numWanted = numWanted;
					DB.setIdea(ideaId, storedIdea);
					window.location.assign("user.html");
				});
			};

			var updateUser = function(author){
				author.authorList.push(ideaCounter);
				author.iList.push(ideaCounter);

				DB.setUser(user.id, author);

				recorded();
			};

			// Gets the idea counter and sends a callback function which it calls once data is recevied.
			if(ideaCounter){
				updateIdea(ideaCounter);
				newIdea = false;
			}else{
				DB.getCounter(addIdea);
			}
		}
	};

	/////////////////////////////////////////////
	//////							   						 ///////////////
	//////      FORM EDIT INIT         ////////////////////
	//////							   						 /////////////////////////
	//////////////////////////////////////////////////////////////////

	window.formEditInit = function(ideaId){
		tinymce.init({
			selector: "textarea",
			plugins: [""],
			menubar: false,
			statusbar: false,
			toolbar: "bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent" 
		});


		DB.getIdea(ideaId, function(storedIdea){

			if(storedIdea.authorId === user.id){
				$('.ideaTitle').val(storedIdea.ideaTitle);
				tinyMCE.activeEditor.setContent(storedIdea.ideaDesc);
				$('.numWanted').val(storedIdea.numWanted);

				$(document).on("click", ".ideaSubmit", function(e){
					e.preventDefault();
					ideaSubmit(storedIdea.ideaId);
				});
			}else{
				formInit();
			}

		});
	}


	/////////////////////////////////////////////
	//////							       				 ///////////////
	//////      Helper Methods         ////////////////////
	//////							   						 /////////////////////////
	//////////////////////////////////////////////////////////////////


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


//*************************************************************//
//***************** BUTTON TRIGGERS **************************//
//***********************************************************//

		$(document).on("click", ".myProfile", function(e){
			e.preventDefault;
			window.location.assign("profile.html?profileId=" + user.id)
		});

})();