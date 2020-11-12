{
    function burgerMenu(selector) {
        let menu = $(selector);
        let button = menu.find('.burger-menu__button');
        let links = menu.find('.burger-menu__link');
        let overlay = menu.find('.burger-menu__overlay');
        button.on('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        links.on('click', () => toggleMenu());
        overlay.on('click', () => toggleMenu());

        function toggleMenu() {
            menu.toggleClass('burger-menu_active');

            // if (menu.hasClass('burger-menu_active')) {
            //     $('body').css('overflow', 'hidden');
            // } else {
            //     $('body').css('hidden', 'overflow');
            // }
        }
    }
    burgerMenu('.burger-menu');
}

// slide2id - плавная прокрутка по ссылкам внутри страницы
$("nav a,a[rel='m_PageScroll2id'],a.PageScroll2id,a.mouse_scroll").mPageScroll2id({
    highlightSelector: "nav a"
});



// создаём элемент <div>, который будем перемещать вместе с указателем мыши пользователя
var mapTitle = document.createElement('div');
mapTitle.className = 'mapTitle';
// вписываем нужный нам текст внутрь элемента
mapTitle.textContent = 'Для активации карты нажмите по ней';
// добавляем элемент с подсказкой последним элементов внутрь нашего <div> с id wrapMap
wrapMap.appendChild(mapTitle);
// по клику на карту
wrapMap.onclick = function () {
    // убираем атрибут "style", в котором прописано свойство "pointer-events"
    this.children[0].removeAttribute('style');
    // удаляем элемент с интерактивной подсказкой
    mapTitle.parentElement.removeChild(mapTitle);
}
// по движению мыши в области карты
wrapMap.onmousemove = function (event) {
    // показываем подсказку
    mapTitle.style.display = 'block';
    // двигаем подсказку по области карты вместе с мышкой пользователя
    if (event.offsetY > 10) mapTitle.style.top = event.offsetY + 20 + 'px';
    if (event.offsetX > 10) mapTitle.style.left = event.offsetX + 20 + 'px';
}
// при уходе указателя мыши с области карты
wrapMap.onmouseleave = function () {
    // прячем подсказку
    mapTitle.style.display = 'none';
}