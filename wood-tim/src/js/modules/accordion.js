let accordion = document.querySelectorAll(".repairoptions__accordion");
let panelAll = document.querySelectorAll('.panel');
panelAll.forEach(item => {
    if (item.classList.contains('panel__open'))
        item.style.maxHeight = item.scrollHeight + 'px';
});
for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        // panelAll.forEach(item => {
        // 	item.classList.remove('panel__open');
        // });
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            this.classList.remove('accordion__open');
        } else {
            for (let x = 0; x < accordion.length; x++) {
                accordion[x].classList.remove('accordion__open')
                accordion[x].nextElementSibling.style.maxHeight = null;

            }
            panel.style.maxHeight = panel.scrollHeight + 'px';
            this.classList.toggle('accordion__open');
            panel.classList.remove('panel__open');
        }
    })
}