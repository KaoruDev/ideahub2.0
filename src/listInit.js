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
//***************   BUTTON TRIGGERS **************************//
//***********************************************************//

	$(".logout").on("click", function(evt){
		evt.preventDefault;
		auth.logout();
	});
})();