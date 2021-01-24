$(document).ready(function(){

	svg4everybody();


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
				slidesToShow: 2
			}
		}, {
			breakpoint: 991,
			settings: {
				slidesToShow: 1
			}
		}]
	});



	// Burger-menu

	const burger = document.querySelector('.burger');
	const span = burger.querySelectorAll('span');
	const overlay = document.querySelector('.overlay');
	const mobileMenu = document.querySelector('.mobile-menu');


	const toggleMobileMenu = function() {
		overlay.classList.toggle('active-overlay');
		burger.classList.toggle('active-burger');
		span.forEach(item => item.classList.toggle('active-span'));
	};

		burger.addEventListener('click', function () {
		toggleMobileMenu("add");
	});

	const menuItems = mobileMenu.querySelectorAll('li a');

	menuItems.forEach(item => {
		item.addEventListener('click', toggleMobileMenu);
	});

	document.addEventListener('keyup', function (e) {
		if(overlay.classList.contains('active-overlay') && e.code === 'Escape') {
			toggleMobileMenu();
		}
	});



	// Pageup

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1200) {
			$('.pageup').fadeIn("slow");
		} else {
			$('.pageup').fadeOut("slow");
		}
	});


	// Smooth scroll

	$('a[href^="#"]').on('click', function() {
		let href = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(href).offset().top
		}, 400);
		return false;
	});


	// Animation

	AOS.init();

});



