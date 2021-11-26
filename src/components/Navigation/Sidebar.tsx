import { faChair, faHome, faReceipt, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import { useActions, useAppState } from "../../overmind"

export const Sidebar: React.FunctionComponent = () => {
    const { layoutIsSideBarOpen, isMobile } = useAppState().app
    const { closeSidebar } = useActions().app

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
        <>
            <nav style={isMobile ? { height: `calc(100vh - 64px)`, width: `250px`, zIndex: 1, transform: !layoutIsSideBarOpen && isMobile ? `translateX(-250px)` : `translateX(0px)` } : {}} className={`sidebar overflow-x-auto transition duration-500 ease-in-out ${!layoutIsSideBarOpen && `sidebar-closed`} absolute md:static `}>
                {sidebarContent.map((sidebarItem, i) => <div key={i} className="text-darkgrey mt-16">
                    <div className="mx-6">
                        {/* Headline */}
                        <h5 className="sidebar-heading text-darkgrey text-xs uppercase font-semibold tracking-wider border-b border-lightgrey">
                            <span className={`bg-white-lightgrey pr-3 transition duration-500 ease-in-out ${layoutIsSideBarOpen ? `opacity-100` : `opacity-0`}`}>{sidebarItem.title}</span>
                        </h5>
                    </div>
                    <ul>
                        {/* NavLink Items */}
                        {sidebarItem.items.map((sidebarAtom, i) => <li key={i}>
                            <NavLink to={sidebarAtom.path} onClick={() => isMobile && closeSidebar()} className="whitespace-nowrap block border-l-4 border-transparent hover:bg-active-grey w-full h-full py-2 px-5">
                                <FontAwesomeIcon icon={sidebarAtom.icon} className="text-lg text-center mr-5" style={{ width: "24px" }}></FontAwesomeIcon>
                                <span className={`transition-opacity duration-500 ease-in-out ${layoutIsSideBarOpen ? `opacity-100` : `opacity-0`}`}>{sidebarAtom.title}</span>
                            </NavLink>
                        </li>)}
                    </ul>
                </div>)}
            </nav>
            {layoutIsSideBarOpen && isMobile && <div className="sidebar-content-overlay" onClick={() => closeSidebar()}></div>}
        </>
    )
}