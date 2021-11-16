import { Link } from "react-router-dom"

export const Navigation: React.FunctionComponent = () => {
    const toggleSidebar = () => {
        const sidebar = document.querySelector('.sidebar')
        if (sidebar?.classList.contains('hidden')) {
            sidebar?.classList.add('block')
            sidebar?.classList.remove('hidden')
        } else {
            sidebar?.classList.add('hidden')
            sidebar?.classList.remove('block')
        }
    }

    return (
        <div className="h-screen bg-darkgrey">
            
        </div>
    )
}