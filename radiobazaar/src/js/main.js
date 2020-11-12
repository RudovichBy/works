// import './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";
	// console.log('test')

	//***************************бургер-меню***************************
	function burgerMenu(selector, button, links, overlay) {

		button.addEventListener('click', (e) => {
			e.preventDefault();
			toggleMenu();
		});


		//Закрываем меню при клике по ссылке
		links.forEach(item => {
			item.addEventListener('click', () => toggleMenu());
		});

		overlay.addEventListener('click', () => {
			toggleMenu();
		});

		function toggleMenu() {
			selector.classList.toggle('burger-menu_active');
			// overlay.classList.toggle('burger-menu__overlay-active');
		}
	}

	const mobileMenu = document.querySelector('.mobile__menu'),
		button = document.querySelector('.burger-menu__button'),
		links = document.querySelectorAll('.nav__item'),
		overlay = document.querySelector('.burger-menu__overlay');

	burgerMenu(mobileMenu, button, links, overlay);

	//=================================================================


	//==============================Swiper==============================

	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		speed: 800,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})


	//Липкое/закрепить меню навигации
	window.onscroll = function () {
		myFunction()
	};

	let navbar = document.getElementById("navbar");
	window.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop > 0) {
			navbar.classList.add("sticky")
		} else {
			navbar.classList.remove("sticky");
		}
	});
});