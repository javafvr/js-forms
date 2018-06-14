$(document).ready(function() {

	(function(){
		var	_form = $('#form'),
			_errorMsg = _form.find('.error');

		var formValidation = {
			isValid: true,

			init: function(){
				this._setUpListeners();	
			},

			_setUpListeners: function(){
				_form.on('submit', function (event) {
					$('div').remove('.error');
					formValidation._validateForm(event);	
				});				

				_form.on('keydown', function (event) {
					formValidation._hideError(event);	
				});


			},

			_validateForm: function(event) {
				var inputs = _form.find('input, textarea'),
					valid = true;

				$.each(inputs, function(index, val){
					var input = $(val),
						value = input.val().trim();
					
					if(value.length==0){
						event.preventDefault();
						isValid:false;
						formValidation._showError(val);

					} else {
						isValid:true;
						console.log('form is valid');
					}
				});

			},
			
			_showError: function(val) {
				var	_errorMsg = $('<div class="error error-hide">'+'Комментарий не может быть пустым.'+'</div>');
				_errorMsg.insertBefore(val);
				_errorMsg.fadeIn(2000);
			},

			_hideError: function(event) {
				_errorMsg = $(event.target.previousElementSibling);
				_errorMsg.fadeOut(500);
			}

		};

		formValidation.init();

	}());

});