try {
	console.log('test')
} catch (e) {}
// const burger = (menuSelector, burgerSelector) => {
// 	const menuElem = document.querySelector(menuSelector),
// 		burgerElem = document.querySelector(burgerSelector);

// 	menuElem.style.display = 'none';
// 	try {
// 		burgerElem.addEventListener('click', () => {
// 			if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {
// 				menuElem.style.display = 'block';
// 			} else {
// 				menuElem.style.display = 'none';
// 			}
// 		});

// 		window.addEventListener('resize', () => {
// 			if (window.screen.availWidth > 992) {
// 				menuElem.style.display = 'none';
// 			}
// 		});
// 	} catch(e){}
// };

// export default burger;