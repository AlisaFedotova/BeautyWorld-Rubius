function collapseText(btn) {
    let target = document.querySelector(btn.dataset.target);

    if (target) {
        const isShown = target.classList.contains('show');
        target.classList.toggle('show', !isShown);
        target.classList.toggle('collapse', isShown);
    }
}