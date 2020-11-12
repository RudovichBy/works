// import './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";
	console.log('test')

	$(function () {

		//меняем цвет кнопки в логотипе
		$('.logo__litera').each(function () {
			let ths = $(this);
			ths.html(ths.html().replace('L', '<span>L</span>'));
		});


		// делаем всплывающую поисковую строку
		$('.search').click(function () {
			$('.search__field').stop().slideToggle();
			$('.search__field input[type=text]').focus();
		});
		$(document).keyup(function (e) {
			if (e.keyCode == 27) {
				$('.search__field').slideUp();
			}
		}).click(function () {
			$('.search__field').slideUp();
		});
		$('.search__wrap').click(function (e) {
			e.stopPropagation();
		});

		//Мобильное меню
		$('.top__line').after('<div class="mobile__menu"></div>');
		$('.top__menu').clone().appendTo('.mobile__menu');
		$('.mobile__menu__button').click(function () {
			$('.mobile__menu').stop().slideToggle();
		});

		// $('.third__item').hover(function () {
		// 	const ths = $(this);
		// 	const lnk = ths.closest('.third__item').find('h4 a');
		// 	lnk.addClass('hover');
		// }, function () {
		// 	lnk.removeClass('hover');
		// });

		$("body").prognroll({
			height: 3,
			color: "#ec1c1c",
			custom: false
		});
	});
});