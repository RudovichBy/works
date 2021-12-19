import scrollingicator from './modules/scrollingicator';
import burgerMenu from './modules/burgerMenu';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";
	
	scrollingicator();
	burgerMenu('.mobile_menu', '.burger-menu_button', '.nav_item', '.burger-menu_overlay');

});