$(document).ready(function() {

	(function(){
		var	_form = $('#form'),
			_errorMsg = _form.find('.error'),
			_validEmail = 'mail@mail.com',
			_validPass='123';

		var formValidation = {
			isValid: true,

			init: function(){
				this._setUpListeners();	
			},

			_setUpListeners: function(){
				_form.on('submit', function (event) {
					$('div').remove("[class~='error']");
					$('div').remove("[class~='error-description']");
					formValidation._validateForm(event);	
				});				

				_form.on('keydown', function (event) {
					formValidation._hideError(event);	
				});
			},

			_validateForm: function(event) {
				var inputs = _form.find('input, textarea'),
					login = '',
					password = '';

				isValid =true;
				
				$.each(inputs, function(index, val){
					var input = $(val),
						value = input.val().trim();
						msg = 'Комментарий не может быть пустым.';
						required = input.attr('data-valid') =='required';
						inputType = input.attr('type').toLowerCase();

					if (value !=='') {
						
						// email validate
						if (inputType === 'email') {
								var pattern = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;
								if (!pattern.test(value)) {
									msg = 'Неверный формат email';
									event.preventDefault();
									isValid:false;
									formValidation._showError(val, msg);
								} else{
									login = value;
									// isValid = true;
								}
							}

						// password validate
						if (inputType === 'password') {
								// required=false;
								password=value;
								// isValid = true;
							}

					} else{
						if (required) {
							switch(inputType) {
								case 'email':  msg = 'Введите email';
								break;
								case 'password': msg = 'Введите пароль';
								break;
								default: msg = '*';
								break;
							}

						 	event.preventDefault();
							isValid = false;
							formValidation._showError(val, msg);
						}
					}
				});

				formValidation._checkAccess(login, password);
			},
			
			_showError: function(val, msg) {
				var	_errorMsg = $('<div class="error error-hide">'+msg+'</div>');
				_errorMsg.insertBefore(val);
				_errorMsg.fadeIn(2000);
			},
			
			_showErrorWithDescr: function(val) {
				_errorMsg = $('<div class="error error--with-desc">Неверный email или пароль</div><div class="error-description"><p>Введите верные данные для входа или воспользуйтесь <a href="#">восстановлением пароля, </a>чтобы войти на сайт.</p></div>');
				_errorMsg.insertAfter($('.plate__heading'));
				_errorMsg.fadeIn(2000);
			},

			_hideError: function(event) {
				_errorMsg = $(event.target).prev("[class~='error']");
				_errorMsg.fadeOut(500);
			},

			_checkAccess: function(login, password) {
				if (isValid) {
					if (login == _validEmail && password == _validPass) {

					} else {
						event.preventDefault();
						formValidation._showErrorWithDescr(event.target);
					}
				}
			}

		};

		formValidation.init();

	}());

});