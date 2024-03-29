const modals = () => {
	let btnPressed = false;

	function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
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
				btnPressed = true;

				if (destroy) {
					item.remove();
				}

				windows.forEach(item => {
					item.style.display = 'none';

					item.classList.add('animated', 'fadeIn');
				});

				modal.style.display = "block";
				// document.body.style.overflow = "hidden";
				// document.body.style.marginRight = `${scroll}px`;
			});
		});

		// закрытие poopup
		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
			});

			modal.style.display = "none";
			document.body.style.overflow = "";
			document.body.style.marginRight = `0px`;
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				windows.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = `0px`;
			}
		});
	}



	// убираем сдвиг странице при появлении popup
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
	bindModal('.button__popup', '.popup__consultation', '.popup__consultation .popup__close');

};

export default modals;