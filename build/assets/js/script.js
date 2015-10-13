$(function () {

	var cardNumberInput = $('.cc-number-control input'),
		cardTypeButtons = $('.cc-type-control input[type=radio]'),
		cardCodeImg = $('.cc-code-sprite');

	function changeIfAmex() {
		if ($('#amex').is(':checked')) {
			cardCodeImg.addClass('is-amex');
		} else {
			cardCodeImg.removeClass('is-amex');
		}
	}

	function validateWithJS() {
	    $('#form-signup').validate({
	    	debug: true,
			errorClass: 'invalid',
			validClass: 'is-valid',
			errorElement: 'label',
			ignore: '.cc-type-control input',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('li').addClass(errorClass + '-control').removeClass(validClass);
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.invalid-control').removeClass(errorClass + '-control').addClass(validClass);
			},
	        rules: {
	            'cc-code': {
	                rangelength: [3,4],
					number: true,
	            },
	            'cc-number': {
					creditcard: true
	            }
	        },
	        messages: {
	            'cc-code': {
	                number: "Please use numbers only",
					rangelength: jQuery.validator.format("Please enter {0}-{1} numbers")
	            }
	        }
	    });
	}

	// Add class to show clearer credit card validation for js users
	cardNumberInput.addClass('force-show-invalid');

	// Detect when Amex is manually checked
	cardTypeButtons.change(changeIfAmex);

	// Validate credit card number (using plugin)
	cardNumberInput.validateCreditCard(function(result) {

		// Check card type
		if (result.card_type === null) {
			cardTypeButtons.prop('checked', false);
		} else {
			$('#' + result.card_type.name).prop('checked', true);
			changeIfAmex();
		}

		// Show when card number is valid
		if (result.valid === true ) {
			cardNumberInput.removeClass('only-show-invalid');
		} else {
			cardNumberInput.addClass('only-show-invalid');
		}

	}, {accept: ['visa', 'amex', 'mastercard', 'discover']});

	// Fallback validation
	Modernizr.load({
		test: Modernizr.input.required,
		nope: {
			'validateFallback': 'assets/js/vendor/jquery.validate.min.js'
		},
		callback: {
			'validateFallback': function (url, result, key) {
				validateWithJS()
			},
		}
	});

});