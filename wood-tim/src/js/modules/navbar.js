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