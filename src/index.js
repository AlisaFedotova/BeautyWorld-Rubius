function collapseText(btn) {
    let target = document.querySelector(btn.getAttribute('data-target'));
    let showIndex = target.className.indexOf('show');
    let className = target.className
    if (showIndex > -1) {
        target.className = className.substr(0, showIndex) + 'collapse';
    } else {
        target.className = className.substr(0, className.indexOf('collapse')) + 'show';
    }
}