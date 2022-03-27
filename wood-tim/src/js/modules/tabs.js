const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'flex') => {
	const header = document.querySelector(headerSelector),
		tab = document.querySelectorAll(tabSelector),
		content = document.querySelectorAll(contentSelector);
	
	if (header !== null && tab.length !== 0 && content.length !== 0) {
		function hideTabContent() {
			content.forEach(item => {
				item.style.display = 'none';
				item.classList.remove('animated');
				item.classList.remove('fade');
				item.style.display = 'none';
			});

			tab.forEach(item => {
				item.classList.remove(activeClass);
			});
		}

		function showTabContent(i = 0) {
			content[i].style.display = display;
			content[i].classList.add('animated');
			content[i].classList.add('fade');
			tab[i].classList.add(activeClass);
		}

		// function showResetContent() {
		// 	if (window.screen.availWidth > 539) {
		// 		content.forEach(item => {
		// 			item.style.display = display;
		// 		});
		// 	}

		// }

		hideTabContent();
		showTabContent();
		// showResetContent();


		header.addEventListener('click', (e) => {
			const target = e.target;
			if (target &&
				(target.classList.contains(tabSelector.replace(/\./, "")) ||
					target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
				tab.forEach((item, i) => {
					if (target == item || target.parentNode == item) {
						hideTabContent();
						showTabContent(i);
					}
				});
			}
		});
	}

};

export default tabs;