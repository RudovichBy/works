let slideIndex = 1,
	slides = document.querySelectorAll('.slider__item'),
	dotsWrap = document.querySelector('.slider__dots'),
	prev = document.querySelector('.prev'),
	next = document.querySelector('.next'),
	dots = document.querySelectorAll('.dot');

showSlides(slideIndex);

function showSlides(n) {

	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}

	slides.forEach((item) => {
		item.classList.add("animated");
		item.style.display = 'none';
	});

	dots.forEach((item) => item.classList.remove('dot__active'));
	slides[slideIndex - 1].style.display = 'block';
	slides[slideIndex - 1].classList.add("slideInRight");
	dots[slideIndex - 1].classList.add('dot__active');
}

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

prev.addEventListener('click', function () {
	plusSlides(-1);
	slides[slideIndex - 1].classList.remove('slideInLeft');
	slides[slideIndex - 1].classList.add('slideInRight');

});

next.addEventListener('click', function () {
	plusSlides(1);
	slides[slideIndex - 1].classList.remove('slideInRight');
	slides[slideIndex - 1].classList.add('slideInLeft');
});

dotsWrap.addEventListener('click', function (event) {
	for (let i = 0; i < dots.length + 1; i++) {
		if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
			currentSlide(i);
		}
	}
});