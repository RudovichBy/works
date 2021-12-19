const burgerMenu = (menu, openBtn, linksNav, overlay_nav) => {


    const mobileMenu = document.querySelector(menu),
        button = document.querySelector(openBtn),
        links = document.querySelectorAll(linksNav),
        overlay = document.querySelector(overlay_nav);


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
        mobileMenu.classList.toggle('burger-menu_active');
        // overlay.classList.toggle('burger-menu_overlay-active');
    }

};
{
    // window.onscroll = function () {
    // 	myFunction()
    // };
    let navbar = document.getElementById("navbar");
    window.addEventListener('scroll', () => {

        if (document.documentElement.scrollTop > 0) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    });
}
export default burgerMenu;