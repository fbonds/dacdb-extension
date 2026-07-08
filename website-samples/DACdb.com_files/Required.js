$(document).ready(function(){

	jQuery.validator.messages.required = " <span class='note'> This is required.</span><br />";

	// jQuery Validate's .validate() only ever creates ONE validator instance, bound to the
	// FIRST form in whatever set it's called on -- but it still attaches its submit-button
	// click delegation to EVERY form in that set. Calling $("form").validate(...) directly on
	// a page with multiple forms (e.g. a page form plus a modal form) means clicking a submit
	// button in ANY of them feeds into the single validator bound to the first form, so the
	// WRONG form ends up being submitted. Looping with .each() gives every form its own
	// independent validator instance, correctly scoped to itself.
	$("form").each(function(){
		$(this).validate({
			  rules: {
				    ClubNumber: {
				      required: true,
				      min: 1
				    }
				  },

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
			submitHandler: function(form) {
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
});