import scrollingicator from './modules/scrollingicator';
import burgerMenu from './modules/burgerMenu';
import scrolling from './modules/scrolling';
import tabs from './modules/tabs';
// import sliderSwiper from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";
	
	scrollingicator();
    burgerMenu('.mobile_menu', '.burger-menu_button', '.nav_item', '.burger-menu_overlay');
    scrolling('.pageup');
    tabs('.product ', '.product_toggle', '.product_toggle-collum', 'product_toggle-active');

	let mySwiper = new Swiper('.swiper', {
        loop: true,
        speed: 900,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
});