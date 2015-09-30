// Credit card – Adds class to show clearer validation for js users
$('.cc-number-control .icon-form-validation').addClass('force-show-invalid');


// Credit card validate
$('#cc-number').validateCreditCard(function(result) {

	var radioButtons_all = $('.cc-type-control input');

	// Check card type – No card type detected
	if (result.card_type == null) {

		radioButtons_all.prop('checked', false);

	// Check card type – Amex stuff
	} else if (result.card_type.name == 'amex') {

		$('#amex').prop('checked', true);
		$('.cc-code-sprite').addClass('is-amex');

	// Check card type – All card types but amex
	} else {

		var cardName = result.card_type.name;
		var radioButton = $('#' + cardName);
		radioButton.prop('checked', true);
		$('.cc-code-sprite').removeClass('is-amex');
	} 


	// Validate – Indicate if card number is valid
	if (result.valid == true ) {
		$('.cc-number-control .icon-form-validation').removeClass('only-show-invalid');
	} else {
		$('.cc-number-control .icon-form-validation').addClass('only-show-invalid');
	}


}, { accept: ['visa', 'amex', 'mastercard', 'discover'] });