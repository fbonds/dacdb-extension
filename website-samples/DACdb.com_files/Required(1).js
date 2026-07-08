$(document).ready(function(){

	jQuery.validator.messages.required = " <span class='note'> This is required. </span>";
	
	$("form").validate({
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			// alert(errors);
			if (errors) {
				var message = errors == 1
					? 'You missed 1 required item. It has been highlighted'
					: 'You missed ' + errors + ' required items.  They have been highlighted.';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		},
		onkeyup: false,
		submitHandler: function() {
			$("div.error").hide();
			// alert("submit! use link below to go to the other step");
			form.submit();
		},
		messages: {
			Email: {
				required: " ",
				email: "Please enter a valid email address, example: you@yourdomain.com",
				remote: jQuery.validator.format("{0} is already taken, please enter a different address.")
			}
		},
		debug:false
	});
});