$(document).ready(function () {

	//
	// if ($('.styler').length) {
	// 	$('.styler').styler({
	// 		onFormStyled: function () {
	// 			selectLoadImages();
	// 		}
	// 	});
	// }
	//
	// $('.js-ajax-popup').magnificPopup({
	// 	type: 'ajax',
	// 	callbacks: {
	// 		ajaxContentAdded: function () {
	// 			if ($('.styler').length) $('.styler').styler({
	// 				onFormStyled: function () {
	// 					selectLoadImages();
	// 					fileListcontroll();
	// 				}
	// 			});
	// 			datePicker();
	// 			keyup_form();
	// 			click_submit();
	// 		}
	// 	}
	// });
	//
	// $('.js-inline-popup').magnificPopup({
	// 	type: 'inline',
	// 	callbacks: {
	// 		beforeOpen: function () {
	// 			console.log('Start of popup initialization');
	// 		}
	// 	}
	// });

	datePicker();
	fileListcontroll();
	keyup_form();
	click_submit();

	// Переключение режима отображения пароля (показать)
	$(document).on('mousedown', '.password-control', function () {
		if ($(this).siblings('input').attr('type') == 'password') {
			$(this).addClass('view');
			$(this).siblings('input').attr('type', 'text');
		}
	});

	// Переключение режима отображения пароля (скрыть)
	$(document).on('mouseup mouseout', '.password-control', function () {
		$(this).removeClass('view');
		$(this).siblings('input').attr('type', 'password');
	});

	// Обновление иконки в select и маски в input
	$(document).on('change', '.input-country select', function () {

		let $thisMask = $(this).val(),
			$thisBlock = $(this).closest('.input-country'),
			$thisPlaceholder = $(this).find(':selected').attr('data-placeholder'),
			$thisImg = $(this).find(':selected').attr('data-img'),
			$this = $thisBlock.find('input[data-mask]');

		// $('.input-country .jq-selectbox__select-text').css('background-image', $thisImg);
		$thisBlock.find('.jq-selectbox__select-text').css('background-image', `url(" ${$thisImg} ")`);

		$this.inputmask('remove');
		$this.attr({
			'placeholder': $thisPlaceholder,
			'data-mask': $thisMask,
			'data-placeholder': $thisPlaceholder
		});

		inputMask()

	});

	// Удаление файлов из списка 
	$(document).on('click', '.input-file-list span', function () {

		delete object[$(this).closest('p').attr('id')];
		$(this).closest('p').remove();
		fileQuantity(object);

		// console.log($(this).parent().index());
		// console.log($input.files[$(this).parent().index()]);
		// $input.files[$(this).parent().index()] = 'text';
		// console.log($input.files[$(this).parent().index()]);

	});

});



//Вывод текста ошибка ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function popupForm_error($this, count) {
	if (count >= 1) {
		$this.closest('form').find('.fv__error').addClass('error');
		return false;
	} else {
		$thisForm.find('.fv__error').removeClass('error');
	}
}

//Проверка ввода текстового поля +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function required_input() {
	$(document).on('keyup', '.required--input input', function () {
		if ($(this).closest('div').hasClass('required--email')) {
			return false;
		} else {
			let input = $(this).val();
			if ($(this).attr('data-length')) {
				var inputLenght = $(this).attr('data-length') - 1;
			} else {
				var inputLenght = 3;
			}
			if (input.length > inputLenght) {
				$(this).closest('div').removeClass('error error-online').addClass('success');
			} else {
				$(this).closest('div').removeClass('success').addClass('error-online');
			}
		}
	});
}

//Проверка ввода textarea ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function required_textarea() {
	$(document).on('keyup', '.required--textarea textarea', function () {
		let textarea = $(this).val(),
			textareaLenght;

		if ($(this).attr('data-length')) {
			textareaLenght = $(this).attr('data-length') - 1;
		} else {
			textareaLenght = 3;
		}
		if (textarea.length > textareaLenght) {
			$(this).closest('div').removeClass('error error-online').addClass('success');
		} else {
			$(this).closest('div').removeClass('success').addClass('error-online');
		}
	});
}

//Запрет ввода букв ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function num_inset() {
	$(document).on("change keyup input click", '.num--inset input', function () {
		if (this.value.match(/[^0-9^+]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});
}

//Проверка ввода пароля (первый шаг)++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let firstPasswordsuccess = 0,
	firstPasswordValue = 0,
	secondPasswordsuccess = 0,
	secondPasswordValue = 0;

function first_password() {
	$(document).on("change keyup input click", '.password-first input', function () {

		let mainBlock = $(this).closest('.required--password'),
			innerBlock = $(this).closest('div'),
			secondPassword = mainBlock.find('.password-second');
		// minlength = $(this).attr('minlength'),
		// maxlength = $(this).attr('maxlength');

		if (secondPasswordValue > 0) {
			if (this.value.length >= 4 && this.value.length <= 8 && this.value === secondPasswordValue) {
				firstPasswordsuccess = true;
				secondPasswordsuccess = true;

				mainBlock.removeClass('error error-online').addClass('success');
				secondPassword.removeClass('error error-online not-equally').addClass('success');
				innerBlock.removeClass('error error-online not-equally').addClass('success');
			}
			else if (this.value.length >= 4 && this.value.length <= 8 && this.value !== secondPasswordValue) {
				firstPasswordsuccess = false;
				innerBlock.removeClass('success error error-online').addClass('not-equally');
				mainBlock.removeClass('success').addClass('error-online');
			}
			else if (this.value.length < 4 || this.value.length > 8) {
				firstPasswordsuccess = false;
				innerBlock.removeClass('success error not-equally').addClass('error-online');
				mainBlock.removeClass('success').addClass('error-online');
			}
			else { }
		}
		else {
			if (this.value.length >= 4 && this.value.length <= 8) {
				firstPasswordsuccess = true;
				innerBlock.removeClass('error error-online').addClass('success');
				secondPassword.addClass('show');
				mainBlock.removeClass('success').addClass('error-online');
			}
			else {
				firstPasswordsuccess = false;
				innerBlock.removeClass('success').addClass('error-online');
				secondPassword.removeClass('show');
				mainBlock.removeClass('success').addClass('error-online');
			}
		}

		firstPasswordValue = this.value

	});
}

//Проверка ввода пароля (второй шаг)++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function second_password() {
	$(document).on("change keyup input click", '.password-second input', function () {

		let mainBlock = $(this).closest('.required--password'),
			innerBlock = $(this).closest('div');

		if (this.value.length >= 4 && this.value.length <= 8 && this.value === firstPasswordValue) {
			secondPasswordsuccess = true;
			firstPasswordsuccess = true;
			mainBlock.find('.password-first').removeClass('error error-online not-equally').addClass('success');
			innerBlock.removeClass('error error-online not-equally').addClass('success');
			mainBlock.removeClass('error error-online').addClass('success');
		}
		else if (this.value.length >= 4 && this.value.length <= 8 && this.value !== firstPasswordValue) {
			secondPasswordsuccess = false;
			innerBlock.removeClass('success error error-online').addClass('not-equally');
			mainBlock.removeClass('error success').addClass('error-online');
		}
		else if (this.value.length < 4 || this.value.length > 8) {
			secondPasswordsuccess = false;
			innerBlock.removeClass('error success not-equally').addClass('error-online');
			mainBlock.removeClass('success').addClass('error-online');
		}
		else { }

		secondPasswordValue = this.value;

	});
}

//Инит маски +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function inputMask() {
	$('.input--mask input').each(function () {

		let $this = $(this);
		let $thisMask = $(this).attr('data-mask');
		let $thisPlaceholder = $(this).attr('data-placeholder');

		if (($thisPlaceholder == '' || !$thisPlaceholder)) {
			$this.inputmask("" + $thisMask + "", {
				oncomplete: function () {
					$(this).closest('.input--mask').removeClass('error error-online').addClass('success')
				},
				oncleared: function () {
					$(this).closest('.input--mask').removeClass('success').addClass('error-online');
				},
				onincomplete: function oncomplete() {
					$(this).closest('.input--mask').removeClass('success').addClass('error-online');
				},
				onKeyValidation: function (key, result) {
					console.log('onKeyValidation');
				}
			});
		}
		else {
			if ($this.closest('.input--mask').hasClass('date')) {
				$this.inputmask($thisMask)
				return
			}
			$this.inputmask("" + $thisMask + "", {
				placeholder: "" + $thisPlaceholder + "",
				oncomplete: function () {
					$(this).closest('.input--mask').removeClass('error error-online').addClass('success')
				},
				oncleared: function () {
					$(this).closest('.input--mask').removeClass('success').addClass('error-online');
				},
				onincomplete: function oncomplete() {
					$(this).closest('.input--mask').removeClass('success').addClass('error-online');
				},
				onKeyValidation: function (key, result) {
					console.log('onKeyValidation');
				}
			})
		}
	});

}

// Проверка datepicker при вводе данных ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function required_date() {
	$(document).on('change', '.required--date input', function () {
		let thisDateBlock = $(this).closest('.required--date');

		if ($(this).val() != '') {
			thisDateBlock.removeClass('error error-online').addClass('success')
		}
		else {
			thisDateBlock.remove('success').addClass('error-online')
		}
	});
}

//Проверка ввода поля емайл ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function required_email() {
	$(document).on('keyup', '.required--email input', function () {
		let email = $(this).val(),
			emailDiv = $(this).closest('div');

		if (email.length >= 0 && (email.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1) {
			emailDiv.removeClass('success').addClass('error-online');
		} else if (email === '') {
			emailDiv.removeClass('error error-online').addClass('sucses');
		} else {
			emailDiv.removeClass('error error-online').addClass('success')
		}
	});
}

//Проверка ввода поля емайл ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function emailInputControl() {
	$('.email-input-control input').keyup(function () {
		let email = $(this).val(),
			emailDiv = $(this).closest('div');

		if (email.length > 0 && (email.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1 && !$(this).closest('div').hasClass('error-online')) {
			emailDiv.addClass('error-online required--email').append('<span class="email-input-error-text">Неверный email!</span>')
		}
		else if (email.length > 0 && (email.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1 && $(this).closest('div').hasClass('error-online')) return
		else if (email.length === 0) {
			emailDiv.removeClass('error-online error required--email success');
			emailDiv.find('.email-input-error-text').remove();
		}
		else {
			emailDiv.removeClass('error-online error required--email').addClass('success');
			emailDiv.find('.email-input-error-text').remove();
		}
	});
}

//Проверка изминения радио баттона +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function radioChange() {
	$(document).on('change', '.radio--required :radio', function () {
		let radiolDiv = $(this).closest('.radio--required');
		radiolDiv.removeClass('error').addClass('success');
	});
}

//Проверка изминения селекта +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function selectChange() {
	$(document).on('change', '.required--select select', function () {
		let val = $(this).val(),
			selectDiv = $(this).closest('.required--select');

		if (val === 'Not selected') {
			selectDiv.removeClass('success').addClass('error')
			return false
		} else {
			selectDiv.removeClass('error').addClass('success')
		}
	});
}

//Проверка изминения одного чекбокса +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function checkChange() {
	$(document).on('change', '.required--check :checkbox', function () {
		let val = $(this).prop('checked'),
			checkDiv = $(this).closest('.required--check');

		if (val) {
			checkDiv.removeClass('error').addClass('success')
			$(this).closest('label').siblings().find(':checkbox').prop('checked', false)
		} else {
			checkDiv.removeClass('success').addClass('error')
		}
		checkDiv.find('.styler').trigger('refresh')
	});
}

//Проверка изминения множественного чебокса ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function checkMoreChange() {
	$(document).on('change', '.check-more :checkbox', function () {
		let val = $(this).prop('checked'),
			checkDiv = $(this).closest('.check-more');

		if (val) {
			checkDiv.removeClass('error').addClass('success')
		}
		else if (!$('.check-more :checked').length) {
			checkDiv.removeClass('success').addClass('error');
		}
	});
}

//Проверка изминения input file ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function fileChange() {
	$(document).on('change', '.required--file input[type="file"]', function () {
		let val = $(this).val(),
			fileDiv = $(this).closest('.required--file');

		if (val === "") {
			fileDiv.removeClass('success').addClass('error')
		} else {
			fileDiv.removeClass('error').addClass('success')
		}
	});
}

//Проверка изминения input file multiple +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function fileChangeMultiple() {
	$(document).on('change', '.required--file--multiple input[type="file"]', function () {
		let fileDiv = $(this).closest('.required--file--multiple'),
			val = fileDiv.find('.input-file-list p').length,
			max = fileDiv.attr('data-max');

		if (val > max || val == 0) {
			fileDiv.removeClass('success').addClass('error')
		} else {
			fileDiv.removeClass('error').addClass('success')
		}
	});
}

//Датапикер ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function datePicker() {
	$('.date-picker').each(function () {
		var $this = $(this);

		var dataLang = $(this).attr('data-lang');
		var dayNames, dayNamesShort, dayNamesMin, monthNames, monthNamesShort;

		let img = $(this).attr('data-src');
		let template = $(this).attr('data-template');

		$.getJSON("./temp/data.json", function (data) {

			if (dataLang == 'ru') {
				var lang = data.ru;
			}
			if (dataLang == 'en') {
				var lang = data.en;
			}

			for (var item in lang) {
				if (lang[item].dayNames) {
					dayNames = lang[item].dayNames;
				}

				if (lang[item].dayNamesShort) {
					dayNamesShort = lang[item].dayNamesShort;
				}
				if (lang[item].dayNamesMin) {
					dayNamesMin = lang[item].dayNamesMin;
				}
				if (lang[item].monthNames) {
					monthNames = lang[item].monthNames;
				}
				if (lang[item].monthNamesShort) {
					monthNamesShort = lang[item].monthNamesShort;
				}
			}

		}).done(function () {
			$this.datepicker({
				firstDay: 1,
				changeMonth: true,
				changeYear: true,
				yearRange: '1980:c+1',
				minDate: new Date(1980, 10 - 1, 25),
				showOn: "button",
				dateFormat: template,
				buttonImage: img,
				buttonImageOnly: true,
				dayNames: dayNames,
				dayNamesShort: dayNamesShort,
				monthNames: monthNames,
				dayNamesMin: dayNamesMin,
				monthNamesShort: monthNamesShort,
				afterShow: function (inst) {
					$('.ui-datepicker-title select').styler();
				},
			}).click(function () { $(this).datepicker('show'); });
		});
	});
}

// Пользовательское событие для для datepicker
$(function () {
	if ($('.date-picker').length) {
		$.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
		$.datepicker._updateDatepicker = function (inst) {
			$.datepicker._updateDatepicker_original(inst);
			var afterShow = this._get(inst, 'afterShow');
			if (afterShow)
				afterShow.apply((inst.input ? inst.input[0] : null));
		}
	}
});

// Загрузка иконок стран в select ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function selectLoadImages() {
	let inputCountrySelect = $('.input-country select')
	if (inputCountrySelect.length) {

		inputCountrySelect.each(function () {
			$(this).find('option').each(function () {
				let inputCountryDiv = $(this).closest('.input-country');
				inputCountryDiv.find('.jq-selectbox__dropdown ul li').eq($(this).index()).css('background-image', `url(" ${$(this).attr('data-img')} ")`);
				inputCountryDiv.find('.jq-selectbox__select-text').css('background-image', $('.input-country .selected.sel').css('background-image'));

			})
		})
	}
}

// Удаление выбранных файлов из input-file
var
	$inputFile = $('.required--file--multiple input[type="file"]'),
	$fileList = $('.input-file-list'),
	$input,
	object = {},
	i,
	j = 0;

function fileListcontroll() {

	$inputFile.styler({
		fileBrowse: '',
		filePlaceholder: '',
		fileNumber: ''
	});

	$inputFile.on('change', function (e) {
		$input = e.target;

		for (i = 0; i < $input.files.length; i++, j++) {
			$('<p id="' + j + '">' + $input.files[i].name + '<span></span></p>').appendTo($fileList);
			object[j] = $input.files[i];
		}

		fileQuantity(object);

	});

}

// Подсчет количества выбранных файлов
function fileQuantity(object) {
	let length = $('.input-file-list p').length;
	if (Object.keys(object).length > $('.required--file--multiple').attr('data-max') || Object.keys(object).length == 0) {
		$('.required--file--multiple').removeClass('success').addClass('error');
	} else {
		$('.required--file--multiple').removeClass('error').addClass('success');
	}
}

//Функция сабмита +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function click_submit() {
	$('body').on('click', '.required--sbmt', function (e) {

		let $this = $(this),
			$thisForm = $this.closest('form'),
			Errorcount = 0;

		// Проверка полей с паролем
		let passwordRequired = $thisForm.find('.required--password'),
			passwordFirst = passwordRequired.find('.password-first'),
			passwordSecond = passwordRequired.find('.password-second');

		if (passwordRequired.length) {
			if (passwordFirst.hasClass('success') && passwordSecond.hasClass('success')) {
				passwordRequired.removeClass('error').addClass('success');

			}
			else {
				passwordRequired.removeClass('success error-online').addClass('error')
				Errorcount++;
			}
		}



		//Проверка инпутов на пустоту +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let inputRequired = $thisForm.find('.required--input input');
		if (inputRequired.length) {
			inputRequired.each(function () {
				let inputValue = $(this).val();
				let $this = $(this);

				if (inputValue === '') {
					$this.closest('div').removeClass('success').addClass('error');
					Errorcount++;
				} else if (!inputValue === '' && $this.closest('div').hasClass('error') && !$this.closest('div').hasClass('error-online')) {
					$this.closest('div').removeClass('error').addClass('success');
				}
			});
		}

		//Проверка textarea на пустоту +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let inputTextarea = $thisForm.find('.required--textarea textarea');
		if (inputTextarea.length) {

			inputTextarea.each(function () {
				let inputValue = $(this).val();
				let $this = $(this);
				if (inputValue == '') {
					$this.closest('div').removeClass('success').addClass('error');
					Errorcount++;
				} else if (!inputValue == '' && $this.closest('div').hasClass('error') && !$this.closest('div').hasClass('error-online')) {
					$this.closest('div').removeClass('error').addClass('success');
				}
			});
		}

		//Проверка маски  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let maskReq = $thisForm.find('.input--mask');
		maskReq.each(function () {
			if (!$(this).hasClass('success')) {
				$(this).removeClass('success').addClass('error');
				Errorcount++;
			}
		})

		// Проверка поля с email +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let emailRequired = $thisForm.find('.required--email input');
		if (emailRequired.length) {
			emailRequired.each(function () {
				let inputValue = $(this).val();
				let $this = $(this);

				if (inputValue.length >= 0 && (inputValue.match(/.+?\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1) {
					$this.closest('div').removeClass('success').addClass('error');
					Errorcount++;
				}
				else if (inputValue === '') {
					$this.closest('div').removeClass('success').addClass('error');
					Errorcount++;
				}
				else if (!inputValue === '' && $this.closest('div').hasClass('error') && !$this.closest('div').hasClass('error-online')) {
					$this.closest('div').removeClass('error').addClass('success');
				}
			});
		}

		//Проверка одиночного чекбокса +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let checkRequired = $thisForm.find('.required--check');
		if (checkRequired.length) {
			let checked = 0;
			checkRequired.each(function () {
				$(this).find(':checkbox').each(function () {
					if ($(this).prop('checked')) {
						checked++;
					}
				})
				if (checked > 0) {
					$(this).removeClass('error');
				} else {
					$(this).addClass('error');
					Errorcount++;
				}
			});
		}

		// Проверка нескольких чекбоксов +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let checkMore = $thisForm.find('.check-more');
		if (checkMore.length) {
			let checked = 0;
			checkMore.each(function () {
				$(this).find(':checkbox').each(function () {
					if ($(this).prop('checked')) {
						checked++
					}
				})
				if (checked != 0) {
					$(this).removeClass('error')
				} else {
					$(this).addClass('error')
					Errorcount++;
				}
			})
		}

		// Проверка радиобатона +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let radioReq = $thisForm.find('.radio--required');
		if (radioReq.length) {
			let checked = 0;
			radioReq.each(function () {
				$(this).find(':radio').each(function () {
					if ($(this).prop('checked')) {
						checked++
					}
				})
				if (checked > 0) {
					$(this).removeClass('error error-online').addClass('success')
				} else {
					$(this).removeClass('success').addClass('error')
					Errorcount++;
				}
			});
		}

		// Проверка селекта +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let selectReq = $thisForm.find('.required--select');
		if (selectReq.length) {
			selectReq.each(function () {
				var sel = $(this).find('select :selected');
				if (sel.val() === 'Not selected') {
					sel.closest('.required--select').removeClass('success').addClass('error');
					Errorcount++;
				} else {
					sel.closest('.required--select').removeClass('error').addClass('success');
				}
			})
		}

		// Проверка файла (одниночный) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let fileReq = $thisForm.find('.required--file');
		if (fileReq.length) {
			fileReq.each(function () {
				let file = $(this).find('input');
				if (file.val() == '') {
					file.closest('.required--file').removeClass('success').addClass('error');
					Errorcount++;
				}
				else {
					file.closest('.required--file').removeClass('error').addClass('success');
				}
			})
		}

		// Проверка файла (multiple) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let fileReqMultiple = $thisForm.find('.required--file--multiple'),
			maxLength = fileReqMultiple.attr('data-max');
		if (fileReqMultiple.length) {
			fileReqMultiple.each(function () {
				let files = $(this).find('.input-file-list p');
				if (files.length == '' || files.length > maxLength) {
					fileReqMultiple.removeClass('success').addClass('error');
					Errorcount++;
				}
				else {
					fileReqMultiple.removeClass('error').addClass('success');
				}
			})
		}

		// Проверка date-picker +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		let dataPicker = $thisForm.find('.required--date');
		dataPicker.each(function () {
			let val = dataPicker.find('input').val();
			if (val == '') {
				$(this).closest('required--date').removeClass('success').addClass('error');
				Errorcount++;
			} else if (!val == '' && $(this).closest('required--date').hasClass('error') && !$(this).closest('required--date').hasClass('error-online')) {
				$(this).closest('required--date').removeClass('error error-online').addClass('success');
			}
		});

		//Вывод ошибки вверху
		popupForm_error($this, Errorcount);

		console.log(Errorcount);

		//  Отпралять или нет
		if (Errorcount > 0) {
			if ($(this).closest('.fv')) {
				//Если до верха
				// let pos = $(this).closest('form').find('.error').offset().top
				//Если до инпута
				let pos = $(this).closest('form').find('.error').offset().top
				$([document.documentElement, document.body]).animate({
					scrollTop: pos - 30
				}, 1000);
				return false;
			}
			return false;
		} else {
			// alert('Отправлено')
			// $thisForm.submit();
		}

	});

}

// Переключение режима отображения пароля
// $(document).on('click', '.password-control', function () {
// 	if ($(this).siblings('input').attr('type') == 'password') {
// 		$(this).addClass('view');
// 		$(this).siblings('input').attr('type', 'text');
// 	} else {
// 		$(this).removeClass('view');
// 		$(this).siblings('input').attr('type', 'password');
// 	}
// });

function keyup_form() {
	num_inset();
	required_email();
	required_input();
	required_textarea();
	required_date();
	first_password();
	second_password();
	inputMask();
	radioChange();
	selectChange();
	checkChange();
	checkMoreChange();
	fileChange();
	emailInputControl();
}