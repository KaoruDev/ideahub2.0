(function(){
	
	window.DB;
	window.user;
	window.auth;

	_.templateSettings = {
	  interpolate: /\{\{(.+?)\}\}/g
	};

	_.mixin({
		getTemplate: function(name){
			return _.template($("#templates ." + name).html());
		}
	})

})();