$(document).ready(function(){
	const width = $(window).width();
	const height = $(window).height();

	console.log('Width: ' + width + 'px');
	console.log('Height: ' + height + 'px');

	svg4everybody();

	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy",
		load_delay: 100
	});


	if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /rv:10.0/i.test(navigator.userAgent)) {

		//Добавить класс ie в боди
		document.body.className = "ie";
		//Перенаправить на другую страницу
		window.location = '/ie.html';

	}


	//Клик вне блока
	// $(document).mouseup(function (e){
	// 	var div = $(БЛОК);
	// 	if (!div.is(e.target)
	// 		&& div.has(e.target).length === 0) {
	// 		div.removeClass('open');
	// 	}
	// });

	//Попап инит
	// $('.ajax-form').magnificPopup({
	// 	type: 'ajax',
	// 	ajaxContentAdded: function() {
	// 		console.log(this.content);
	// 	}
	// });

// Slider

	$('.slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 1100,
		dots: false,
		prevArrow: false,
		nextArrow: '<button type="button" class="slick-next"><img src="img/svg/arrow-right.svg"></button>',
		swipeToSlide: true,
		responsive: [{
			breakpoint: 1181,
			settings: {
				slidesToShow: 3
			}
		}, {
			breakpoint: 1181,
			settings: {
				slidesToShow: 2
			}
		}, {
			breakpoint: 601,
			settings: {
				slidesToShow: 1
			}
		}]

	});


	if($('.styler').length){
		$('.styler').styler();
	}

});


$(window).resize(function () {

	let width = $(window).width();
	let height = $(window).height();

	if(width > 991){
		$('.header').attr('data-mob', 'false');
		menuDex()
	}
	else{
		$('.header').attr('data-mob', 'true');
		menuMob();
	}
});


function menuMob() {

}

function menuDex() {

}
function paralax(elem, vertical, horizontal) {

	if (elem.length) {
		var elementX = 0,
			elementY = 0,
			elementW = 0,
			elementH = 0,
			mouseX = 0,
			mouseY = 0;
		$(document).mousemove(function (e) {
			var position = elem.offset(),
				obj = elem;
			elementX = position.left;
			elementY = position.top;
			elementW = obj.width();
			elementH = obj.height();
			var halfW = elementW / 2;
			var halfH = elementH / 2;
			mouseX = (e.pageX - elementX - halfW) / halfW;
			mouseY = (e.pageY - elementY - halfH) / halfH;
			mouseX = Math.round(mouseX * 100) / 100;
			mouseY = Math.round(mouseY * 100) / 100;

			elem.css({
				"transform": "translateY(" + mouseY * vertical + "px)  translateX(" + mouseX * horizontal + "px) ",
				"-webkit-transform": "translateY(" + mouseY * vertical  + "px) translateX(" + mouseX * horizontal + "px) ",
				"-ms-transform": "translateY(" + mouseY * vertical/ + "px) translateX(" + mouseX * horizontal + "px) ",
				"-o-transform": "translateY(" + mouseY * vertical  + "px) translateX(" + mouseX * horizontal + "px) ",
				"-moz-transform": "translateY(" + mouseY * vertical + "px) translateX(" + mouseX * horizontal + "px) "
			});
		});
	}
}