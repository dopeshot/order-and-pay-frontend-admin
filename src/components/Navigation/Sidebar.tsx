import { faChair, faHome, faReceipt, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import { useAppState } from "../../overmind"

export const Sidebar: React.FunctionComponent = () => {
    const { layoutIsSideBarOpen } = useAppState().app

    const sidebarContent = [{
        title: 'Betrieb',
        items: [{
            title: 'Dashboard',
            icon: faHome,
            path: '/home'
        }, {
            title: 'Bestellungen',
            icon: faReceipt,
            path: '/orders'
        }]
    }, {
        title: 'Konfiguration',
        items: [{
            title: 'Tische',
            icon: faChair,
            path: '/tables'
        }, {
            title: 'Menü',
            icon: faUtensils,
            path: '/menus'
        }]
    }]

    return (
        <nav className={`sidebar ${!layoutIsSideBarOpen && `sidebar-closed`}`}>
            {sidebarContent.map((sidebarItem, i) => <div key={i} className="text-darkgrey mt-16">
                <div className="mx-6">
                    <h5 className="sidebar-heading text-darkgrey text-xs uppercase font-semibold tracking-wider border-b border-lightgrey">
                        <span className="bg-white-lightgrey pr-3">{sidebarItem.title}</span>
                    </h5>
                </div>
                <ul>
                    {sidebarItem.items.map((sidebarAtom, i) => <li key={i}>
                        <NavLink to={sidebarAtom.path} className="block hover:bg-active-grey w-full h-full py-2 px-6">
                            <FontAwesomeIcon icon={sidebarAtom.icon} className="text-lg text-center mr-5" style={{ width: "24px" }}></FontAwesomeIcon>
                            <span>{sidebarAtom.title}</span>
                        </NavLink>
                    </li>)}
                </ul>
            </div>)}
        </nav>
    )
}