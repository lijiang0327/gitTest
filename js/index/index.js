define(['jquery', 'public'], function($, ky) {
	$(function() {
		var $username = $('#username'),
			$password = $('#password'),
			$login = $('#login');
		$login.on('click', function(event) {
			var username = ky.trim($username.val());
			var password = $.trim($password.val());
			event.preventDefault();
			event.stopPropagation();
			console.log(username,password);
		});
	});
});