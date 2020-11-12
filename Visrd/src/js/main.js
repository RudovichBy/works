import './modules/slider';
import './modules/scroling';
import './modules/darktheme';
import tabs from './modules/tabs';
import accordion from './modules/accordion';
import modals from './modules/modals';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";

	modals();
	tabs('.statistics ', '.table__toggle', '.table', 'table__toggle--active');
	accordion('.accordion__heading', '.accordion__block');

	function forms() {
		let turboLabel = document.querySelector('#turbo__label'),
			turboCheckbox = document.querySelector('#turbo'),
			cost = document.querySelector('.cost');
		turboLabel.addEventListener('click', () => {
			if (!turboCheckbox.checked) {
				cost.innerHTML = cost.textContent * 1.5;
			} else {
				cost.innerHTML = cost.textContent / 1.5;
			}
		})
	}
	forms();
});