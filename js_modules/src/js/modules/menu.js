//***************************бургер-меню***************************
function menu(selector, button, links, overlay) {

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
		selector.classList.toggle('menu__active');
		// overlay.classList.toggle('burger-menu__overlay-active');
	}
}

export default menu;