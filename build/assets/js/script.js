$(function () {

	var cardNumberValidate = $('.cc-number-control input'),
		cardTypeButtons_all = $('.cc-type-control input[type=radio]'),
		cardCodeImg = $('.cc-code-sprite');

	function changeIfAmex() {
		if ($('#amex').is(':checked')) {
			cardCodeImg.addClass('is-amex');
		} else {
			cardCodeImg.removeClass('is-amex');
		}
	}

	// Add class to show clearer credit card validation for js users
	cardNumberValidate.addClass('force-show-invalid');

	// Detect when Amex is manually checked
	cardTypeButtons_all.change(changeIfAmex);

	// Validate credit card number (using plugin)
	$('#cc-number').validateCreditCard(function(result) {

		// Check card type
		if (result.card_type === null) {
			cardTypeButtons_all.prop('checked', false);
		} else {
			var cardTypeButton = $('#' + result.card_type.name);
			cardTypeButton.prop('checked', true);
			changeIfAmex();
		}

		// Show when card number is valid
		if (result.valid === true ) {
			cardNumberValidate.removeClass('only-show-invalid');
		} else {
			cardNumberValidate.addClass('only-show-invalid');
		}

	}, {accept: ['visa', 'amex', 'mastercard', 'discover']});

}); // END doc ready