function init() {
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
    const tabs = document.querySelector('.tabs');
    const tabArray = document.querySelectorAll('.tabs__tab');
    const tabContents = document.querySelectorAll('.tabs__content-item');

    const activateTab = tabnum => {
        tabArray.forEach(tab => {
            tab.classList.remove('active');
        })

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        })

        document.querySelector('#tab' + tabnum).classList.add('active');
        document.querySelector('#tabcontent' + tabnum).classList.add('active');
        localStorage.setItem('jstabs-opentab', JSON.stringify(tabnum))
    }

    tabs.onclick = function (event) {
        let target = event.target;

        if (target.classList.contains('tabs__tab')) {
            activateTab(target.dataset.tab);
        }
    }

    const opentab = JSON.parse(localStorage.getItem('jstabs-opentab')) || '1';
    activateTab(opentab);

    /* BURGER MENU */
    const burgerMenu = document.querySelector('#burger');
    const burgerMenuItems = document.querySelectorAll('#burger-menu .burger-menu-item');

    burgerMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerMenu.checked = !burgerMenu.checked;
        })
    })

    /* FLICKITY CAROUSEL for PORTFOLIO */
    let flkty = new Flickity('#portfolio-carousel', {
        viewBox: '0 0 14 14',
        wrapAround: true,
        autoPlay: true,
        pauseAutoPlayOnHover: true,
        draggable: true,
        cellAlign: 'left',
        pageDots: false
    });
}

window.addEventListener('DOMContentLoaded', init);