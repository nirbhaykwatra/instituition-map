const sidebarItem = document.querySelector('.admin-sidebar-item');

document.addEventListener('click', (e) => {
    const { target } = e;
    
    if (!target.matches('.admin-sidebar-item')) {
        return;
    }
    
    e.preventDefault();
    console.log(target);
});