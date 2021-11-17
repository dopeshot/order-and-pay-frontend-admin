export const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    if (sidebar.classList.contains('sidebar-closed'))
        sidebar.classList.remove('sidebar-closed')
    else
        sidebar.classList.add('sidebar-closed')
}