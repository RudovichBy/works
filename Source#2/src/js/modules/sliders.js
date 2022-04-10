//slides - выбор слайдера
// dir -  вертикальный или горизонтальный слайдер
// prev, next - кнопки переключения слайдера
const sliders = (slides, dir, prev, next) => {
	let slideIndex = 1; // первый слайд который будет отоброжаться 
	let paused = false; // для отключения авто перелистования слайдов при наведени мыши
	const items = document.querySelectorAll(slides);

	function showSlides(n) {
		if (n > items.length) {
			slideIndex = 1;
		}

		if (n < 1) {
			slideIndex = items.length;
		}

		items.forEach(item => {
			item.classList.add("animated"); // анимация переключения слайдав. Должна быть подключена библиотека с анимациями ли бо пропсоны свои стили
			item.style.display = "none";
		});

		items[slideIndex - 1].style.display = "block";
	}

	showSlides(slideIndex);

	function plusSlides(n) {
		showSlides(slideIndex += n)
	}


	// проверка на ошибки(отсутствие слайдов) что бы не сломать скрипт при отсутствии слайдов
	try {
		const prevBtn = document.querySelector(prev),
			nextBtn = document.querySelector(next);

		prevBtn.addEventListener('click', () => {
			plusSlides(-1);

			//добавление анимации
			items[slideIndex - 1].classList.remove('slideInRight');
			items[slideIndex - 1].classList.add('slideInLeft');
		});
		nextBtn.addEventListener('click', () => {
			plusSlides(1);

			//добавление анимации
			items[slideIndex - 1].classList.remove('slideInLeft');
			items[slideIndex - 1].classList.add('slideInRight');
		});
	} catch (e) {}

	function activateAnimation() {
		if (dir === 'vertical') {
			paused = setInterval(function () {
				plusSlides(1);
				items[slideIndex - 1].classList.add('slideInDown');
			}, 5000);
		} else {
			paused = setInterval(function () {
				plusSlides(1);
				items[slideIndex - 1].classList.remove('slideInLeft');
				items[slideIndex - 1].classList.add('slideInRight');
			}, 5000);
		}
	}
	activateAnimation();

	//при наведении мыши отключаем автопереключение слайдов
	items[0].parentNode.addEventListener('mouseenter', () => {
		clearInterval(paused);
	});
	//при уходе мыши включаем автопереключение слайдов
	items[0].parentNode.addEventListener('mouseleave', () => {
		activateAnimation();
	});
};

export default sliders;