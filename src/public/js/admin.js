const content = document.querySelector('.admin-content');

window.addEventListener('load', () => {
    loadPage('/institutions');
})

document.addEventListener('click', (e) => {
    const { target } = e;
    
    if (!target.matches('.admin-sidebar-item')) {
        return;
    }
    
    e.preventDefault();
    console.log(target.href);
    
    loadPage(target.href);
});

async function loadPage(url) {
    const html = await fetch(url).then(response => response.text());
    content.innerHTML = html.toString();
}