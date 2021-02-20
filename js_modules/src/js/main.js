// import './modules/slider';
import menu from './modules/menu';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";
	// console.log('test')
	const mobileMenu = document.querySelector('#menu__mobile'),
		button = document.querySelector('.menu__button'),
		links = document.querySelectorAll('.nav__item'),
		overlay = document.querySelector('.menu__overlay');

		menu(mobileMenu, button, links, overlay);
});