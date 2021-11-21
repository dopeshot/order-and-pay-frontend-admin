export const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    if (sidebar.classList.contains('sidebar-closed'))
        sidebar.classList.remove('sidebar-closed')
    else
        sidebar.classList.add('sidebar-closed')
}

export const showHideElement = (selector) => {
    const element = document.querySelector(selector)
    if (element.classList.contains('hidden'))
        element.classList.remove('hidden')
    else
        element.classList.add('hidden')
}