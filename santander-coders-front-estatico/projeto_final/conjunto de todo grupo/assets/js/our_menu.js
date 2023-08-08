function changeLink(link) {
    let links = document.getElementsByName('our-menu-link')
    links.forEach(element => {
        element.classList.remove('link-selected')
    });
    link.classList.add('link-selected')
}
