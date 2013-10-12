(function(){
	var listCollection = new IdeaCollection();
	var listView = new ListView({
		collection: listCollection,
		el: "#ideasFeed"
	});


	window.listInit = function(){
		DB.getAllIdeas(function(storedIdea){
			listCollection.add(storedIdea);
		});
	};


//*************************************************************//
//***************** BUTTON TRIGGERS **************************//
//***********************************************************//

	$(".logout").on("click", function(evt){
		evt.preventDefault;
		auth.logout();
	});

	$(document).on("click", ".showMoreDesc", function(e){
		e.preventDefault();
		if($(this).text() === "Show More"){
		 	$(this).text("Show Less")
		}else {
			$(this).text("Show More")
		}
		$(this).closest(".columns").find(".ideaDesc").toggleClass("fullDesc");
	});

	$(document).on("click", ".myProfile", function(e){
		e.preventDefault;
		console.log('hi');
		window.location.assign("profile.html?profileId=" + user.id);
	});

	
})();