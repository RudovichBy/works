//==============================Swiper=============================

let mySwiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 800,
    // autoplay: {
    // 	delay: 3000,
    // 	disableOnInteraction: false,
    // },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})