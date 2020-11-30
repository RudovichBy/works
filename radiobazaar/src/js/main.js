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


	//==============================Swiper=============================

	let mySwiper = new Swiper('.swiper-container', {
		loop: true,
		speed: 800,
		// autoplay: {
		// 	delay: 3000,
		// 	disableOnInteraction: false,
		// },
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
	{
		// window.onscroll = function () {
		// 	myFunction()
		// };
		let navbar = document.getElementById("navbar");
		window.addEventListener('scroll', () => {

			if (document.documentElement.scrollTop > 0) {
				navbar.classList.add("sticky")
			} else {
				navbar.classList.remove("sticky");
			}
		});
	}
	//=================================================================


	//========================Scroll Indicator========================
	window.onscroll = function () {
		myFunction()
	};

	function myFunction() {
		let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		let scrolled = (winScroll / height) * 100;
		document.getElementById("myBar").style.width = scrolled + "%";
	}
	//=================================================================


	//============================accordion============================

	let accordion = document.querySelectorAll(".repairoptions__accordion");
	let panelAll = document.querySelectorAll('.panel');
	panelAll.forEach(item => {
		if (item.classList.contains('panel__open'))
			item.style.maxHeight = item.scrollHeight + 'px';
	});
	for (let i = 0; i < accordion.length; i++) {
		accordion[i].addEventListener('click', function () {
			// panelAll.forEach(item => {
			// 	item.classList.remove('panel__open');
			// });
			let panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
				this.classList.remove('accordion__open');
			} else {
				for (let x = 0; x < accordion.length; x++) {
					accordion[x].classList.remove('accordion__open')
					accordion[x].nextElementSibling.style.maxHeight = null;

				}
				panel.style.maxHeight = panel.scrollHeight + 'px';
				this.classList.toggle('accordion__open');
				panel.classList.remove('panel__open');
			}
		})
	}
	//================================================================

	//**************************плавный скрол**************************	
	function scrolling(upSelector) {
		const upElem = document.querySelector(upSelector);

		window.addEventListener('scroll', () => {

			if (document.documentElement.scrollTop > 800) {
				upElem.classList.add('animated', 'fadeIn');
				upElem.classList.remove('fadeOut');
			} else {
				upElem.classList.add('fadeOut');
				upElem.classList.remove('fadeIn');
			}
		});

		let links = document.querySelectorAll('[href^="#"]'),
			speed = 0.3;

		links.forEach(link => {
			link.addEventListener('click', function (event) {
				event.preventDefault();

				let widthTop = document.documentElement.scrollTop,
					hash = this.hash,
					toBlock = document.querySelector(hash).getBoundingClientRect().top,
					start = null;

				requestAnimationFrame(step);

				function step(time) {
					if (start === null) {
						start = time;
					}

					let progress = time - start,
						r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

					document.documentElement.scrollTo(0, r);

					if (r != widthTop + toBlock) {
						requestAnimationFrame(step);
					} else {
						location.hash = hash;
					}
				}
			});
		});

	};

	scrolling('.pageup');
	//=================================================================


	// оптимезация карты
	let yndexMap = () => {

		// создаём элемент <div>, который будем перемещать вместе с указателем мыши пользователя
		const mapTitle = document.createElement('div');
		mapTitle.className = 'mapTitle';
		// вписываем нужный нам текст внутрь элемента
		mapTitle.textContent = 'Для активации карты нажмите на неё';
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


	const modals = () => {
		function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
			const trigger = document.querySelectorAll(triggerSelector),
				modal = document.querySelector(modalSelector),
				close = document.querySelector(closeSelector),
				windows = document.querySelectorAll('[data-modal]'),
				scroll = calcScroll();

			trigger.forEach(item => {
				item.addEventListener('click', (e) => {
					if (e.target) {
						e.preventDefault();
					}

					windows.forEach(item => {
						item.style.display = 'none';
						item.classList.add('animated', 'fadeIn');
					});

					modal.style.display = "block";
					document.body.style.overflow = "hidden";
					document.body.style.marginRight = `${scroll}px`;
				});
			});

			close.addEventListener('click', () => {
				windows.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = `0px`;
				// document.body.classList.remove('modal-open');
			});

			modal.addEventListener('click', (e) => {
				if (e.target === modal && closeClickOverlay) {
					windows.forEach(item => {
						item.style.display = 'none';
					});

					modal.style.display = "none";
					document.body.style.overflow = "";
					document.body.style.marginRight = `0px`;
				}
			});
		}

		function calcScroll() {
			let div = document.createElement('div');

			div.style.width = '50px';
			div.style.height = '50px';
			div.style.overflowY = 'scroll';
			div.style.visibility = 'hidden';

			document.body.appendChild(div);
			let scrollWidth = div.offsetWidth - div.clientWidth;
			div.remove();

			return scrollWidth;
		}

		bindModal('.scrap__btn', '.popup', '.popup .popup__close');
		bindModal('.shop__btn', '.popup-2', '.popup-2 .popup__close');
	};


	modals();


});