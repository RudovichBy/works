let checkbox = document.querySelector('#answer-1'),
	logo = document.querySelector('.logo__img'),
	calendarImg = document.querySelector('.calendar__img'),
	bodyElem = document.querySelector('body'),
	label = document.querySelector('#label-1');

const darkMap = ['body', '.header', '.header__nav__phone', '.header__content', '.baseblock__content__title', '.baseblock__content__subtitle', '.header__content__subtitle', '.card', '.forms__wraper', '.baseblock__content', '.profit__card', '.profit__card__img', '.button__popup', '.questions', '.table__row', '.table__title--1', '.table__title--2', '.forms__items', '.popup__consultation', '.popup__content', '.popup__wrap'];

function darkTheme() {
	label.addEventListener('click', () => {
		if (!checkbox.checked) {
			darkMap.forEach(item => {
				document.querySelectorAll(item).forEach(i => {
					i.classList.add('dark__theme');
				})
			});
			logo.src = './assets/images/logo_dark.svg';
			calendarImg.src = './assets/images/calendar-2.png';
			bodyElem.style.backgroundColor = '#272724';
			bodyElem.style.color = '#fff';

		} else {
			darkMap.forEach(item => {
				document.querySelectorAll(item).forEach(i => {
					i.classList.remove('dark__theme');
				})
			});
			logo.src = './assets/images/logo.svg';
			calendarImg.src = './assets/images/calendar-1.png';
			bodyElem.style.backgroundColor = '#fff';
			bodyElem.style.color = '#000';
		}
	});

}
darkTheme();