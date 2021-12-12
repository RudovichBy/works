import scrollingicator from './modules/scrollingicator';
import burgerMenu from './modules/burgerMenu';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";
console.log('test')
	scrollingicator();
	burgerMenu('.mobile__menu', '.burger-menu__button', '.nav__item', '.burger-menu__overlay');

});