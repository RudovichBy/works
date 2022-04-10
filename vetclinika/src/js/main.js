// import './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";

	function burgerMenu(selector, button, links, overlay) {

		button.addEventListener('click', (e) => {
			e.preventDefault();
			toggleMenu();
		});

		links.forEach(item => {
			item.addEventListener('click', () => toggleMenu());
		});


		function toggleMenu() {
			selector.classList.toggle('burger-menu_active');
			overlay.classList.toggle('header__navigation__row--active');
		}
	}

	const mobileMenu = document.querySelector('.header__navigation'),
		button = document.querySelector('.burger-menu__button'),
		links = document.querySelectorAll('.navigation__item'),
		overlay = document.querySelector('.header__navigation__row');

	burgerMenu(mobileMenu, button, links, overlay);

	// ===========================Табы===========================

	let accordion = (function (element) {

		let _getItem = function (elements, className) { // функция для получения элемента с указанным классом
			let element = undefined;

			elements.forEach(function (item) {
				if (item.classList.contains(className)) {
					element = item;
				}
			});
			return element;
		};
		return function () {
			let _mainElement = {}, // .accordion
				_items = {}, // .accordion-item
				_contents = {}; // .accordion-item-content 
			let _actionClick = function (e) {
					/* if (!e.target.classList.contains('accordion__item__header')) { // прекращаем выполнение функции если кликнули не по заголовку
						return;
					} */
					if (!e.target.getElementsByTagName('p')) { // прекращаем выполнение функции если кликнули не по заголовку
						return;
					}
					e.preventDefault(); // отменям стандартное действие
					// получаем необходимые данные
					let header = e.target,
						item = header.parentElement,
						itemActive = _getItem(_items, 'show');
					if (itemActive === undefined) { // добавляем класс show к элементу (в зависимости от выбранного заголовка)
						item.classList.add('show');
					} else {
						// удаляем класс show у ткущего элемента
						itemActive.classList.remove('show');
						// если следующая вкладка не равна активной
						if (itemActive !== item) {
							// добавляем класс show к элементу (в зависимости от выбранного заголовка)
							item.classList.add('show');
						}
					}
				},
				_setupListeners = function () {
					// добавим к элементу аккордиона обработчик события click
					_mainElement.addEventListener('click', _actionClick);
				};

			return {
				init: function (element) {
					_mainElement = (typeof element === 'string' ? document.querySelector(element) : element);
					_items = _mainElement.querySelectorAll('.questions__slider__item');
					_setupListeners();
				}
			}
		}
	})();
	let accordion1 = accordion();
	accordion().init('.questions__slider__query');
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	//============================Slider===========================
	$(document).ready(function () {

		$('.slider__1').slick({
			centerMode: true,
			dots: true,
			centerPadding: '60px',
			slidesToShow: 3,
			variableWidth: true,
			adaptiveHeight: true,
			responsive: [{
					breakpoint: 992,
					settings: {
						arrows: false,
						centerMode: true,
						centerPadding: '40px',
						slidesToShow: 3,
						variableWidth: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						arrows: false,
						centerMode: false,
						variableWidth: false,
						// centerPadding: '40px',
						slidesToShow: 1
					}
				}
			]
		});
		$('.slider__2').slick({
			dots: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 3,
			// variableWidth: true,
			// adaptiveHeight: true,

			// centerPadding: '60px',
			responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 768,
					settings: {
						centerMode: true,
						arrows: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						centerPadding: '50px',
					}
				}
			]
		});
	});

	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	let yndexMap = () => {

		// создаём элемент <div>, который будем перемещать вместе с указателем мыши пользователя
		const mapTitle = document.createElement('div');
		mapTitle.className = 'mapTitle';
		// вписываем нужный нам текст внутрь элемента
		mapTitle.textContent = 'Для активации карты нажмите по ней';
		// добавляем элемент с подсказкой последним элементов внутрь нашего <div> с id wrapMap
		wrapMap.appendChild(mapTitle);
		// по клику на карту
		wrapMap.onclick = function () {
			// убираем атрибут "style", в котором прописано свойство "pointer-events"
			this.children[0].removeAttribute('style');
			// удаляем элемент с интерактивной подсказкой
			mapTitle.parentElement.removeChild(mapTitle);
		}
		// по движению мыши в области карты
		wrapMap.onmousemove = function (event) {
			// показываем подсказку
			mapTitle.style.display = 'block';
			// двигаем подсказку по области карты вместе с мышкой пользователя
			if (event.offsetY > 10) mapTitle.style.top = event.offsetY + 20 + 'px';
			if (event.offsetX > 10) mapTitle.style.left = event.offsetX + 20 + 'px';
		}
		// при уходе указателя мыши с области карты
		wrapMap.onmouseleave = function () {
			// прячем подсказку
			mapTitle.style.display = 'none';
		}
	}
	yndexMap();


});