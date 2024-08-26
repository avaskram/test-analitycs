////// vendors/plugins/jquery-datepicker/jquery-ui.min.css
////// vendors/plugins/jquery-datepicker/jquery-ui.min.js

function initDatepicker(el,target) {
	function notAvailables(date) {
		var item = '.'+el,
				$calendar = $(item),
				disabledMod = el+bem.mod.disabled,
				notAvailableDates = $calendar.data('not-avialable-dates'),
				notConfirmedDates = $calendar.data('not-confirmed-dates'),
				dmy = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();


		if($.inArray(dmy, notAvailableDates) != -1){
			return [true, "not-available"];
		}
		if($.inArray(dmy, notConfirmedDates) != -1){
			return [true, "not-confirmed"];
		}
		return [true];
	}
	
	$('.js-datepicker').datepicker({
		minDate: 0,
		dateFormat: 'dd M yy',
		beforeShowDay: notAvailables,
		onSelect: function(date, picker){
			$(item).removeClass(disabledMod);
			$('.js-date-chosen-text').html(date);
		}
	});
}
// function transferDate(el) {
// 	$.when(popUpOpen(el)).then(function(){
// 		setTimeout(function () {
// 			var dateVal = $('body').find('.js-date-chosen-text').text(),
// 					dateText = $('body').find('.js-date-chosen-text-target'),
// 					dateInput = $('body').find('.js-date-chosen-input');
// 			dateText.text(dateVal);
// 			dateInput.val(dateVal);
// 		}, 200);
// 	});
// }
//
// $('.js-date-choice-link').on('click', function(){
// 	transferDate($(this));
// 	return false;
// });
