function collapseText(btn) {
    let target = document.querySelector(btn.getAttribute('data-target'));
    if (target.className === 'about__text show') {
        target.className = 'about__text collapse';
    } else {
        target.className = 'about__text show'
    }
}