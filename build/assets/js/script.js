$(function () {

	var cardNumberValidate = $('.cc-number-control .icon-form-validation'),
		cardTypeButtons_all = $('.cc-type-control input[type=radio]'),
		cardCodeImg = $('.cc-code-sprite');

	function changeIfAmex() {
		if ($('#amex').is(':checked')) {
			cardCodeImg.addClass('is-amex');
		} else {
			cardCodeImg.removeClass('is-amex');
		}
	}

	// Credit card – Adds class to show clearer validation for js users
	cardNumberValidate.addClass('force-show-invalid');

	// Look to see if Amex is manually checked
	cardTypeButtons_all.change(changeIfAmex);

	// CARD VALIDATION (using plugin)
	$('#cc-number').validateCreditCard(function(result) {

		// Check card type – No card type detected
		if (result.card_type === null) {
			cardTypeButtons_all.prop('checked', false);
		} else {
			var cardTypeButton = $('#' + result.card_type.name);
			cardTypeButton.prop('checked', true);
			changeIfAmex();
		}

		// Validate – Indicate if card number is valid
		if (result.valid === true ) {
			cardNumberValidate.removeClass('only-show-invalid');
		} else {
			cardNumberValidate.addClass('only-show-invalid');
		}

	}, { accept: ['visa', 'amex', 'mastercard', 'discover'] });

}); // END doc ready