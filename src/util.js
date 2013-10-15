(function(){
	
	window.DB;
	window.user;
	window.auth;
	window.satalite = _.extend({}, Backbone.Events);

	_.templateSettings = {
	  interpolate: /\{\{(.+?)\}\}/g
	};

	_.mixin({
		getTemplate: function(name){
			return _.template($("#templates ." + name).html());
		},

		getURLParameter: function(name) {
		    return decodeURI(
		        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
		    );
		}
	})

})();