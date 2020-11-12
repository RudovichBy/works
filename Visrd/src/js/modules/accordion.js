const accordion = (triggersSelector) => {
	const btns = document.querySelectorAll(triggersSelector);

	btns.forEach(btn => {
		btn.addEventListener('click', function () {
			this.nextElementSibling.classList.toggle('animated');
			this.nextElementSibling.classList.toggle('fade');
			this.nextElementSibling.classList.toggle('active__content');
			// if (this.classList.contains('active-style')) {
			// 	this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
			// } else {
			// 	this.nextElementSibling.style.maxHeight = '0px';
			// }
		});

	});
};

export default accordion;