window.onscroll = function () {
    let block = document.querySelector('.bg-onscroll');

    if (block) {
        let scrolled = window.pageYOffset >= 100;
        block.classList.toggle('bg-white', scrolled);
    }
}

function collapseText(btn) {
    let target = document.querySelector(btn.dataset.target);

    if (target) {
        const isShown = target.classList.contains('show');
        target.classList.toggle('show', !isShown);
        target.classList.toggle('collapse', isShown);
    }
}

/* TABS */
const tabs = document.querySelectorAll('.tabs__tab');
const tabContents = document.querySelectorAll('.tabs__content-item');

const activateTab = tabnum => {

    tabs.forEach(tab => {
        tab.classList.remove('active');
    })

    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    })

    document.querySelector('#tab' + tabnum).classList.add('active');
    document.querySelector('#tabcontent' + tabnum).classList.add('active');
    localStorage.setItem('jstabs-opentab', JSON.stringify(tabnum))

}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        activateTab(tab.dataset.tab);
    })
})

const opentab = JSON.parse(localStorage.getItem('jstabs-opentab')) || '1';

activateTab(opentab);