import { faChair, faHome, faReceipt, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import { useActions, useAppState } from "../../overmind"

export const Sidebar: React.FunctionComponent = () => {
    const { layoutIsSideBarOpen, isMobile, layoutIsSmallSidebar } = useAppState().app
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
        }, {
            title: 'Labels',
            icon: faReceipt,
            path: '/menus/labels'
        }, {
            title: 'Allergens',
            icon: faReceipt,
            path: '/menus/allergens'
        }, {
            title: 'User',
            icon: faUser,
            path: '/users'
        }],
    }]

    return (
        <>
            <nav data-cy="sidebar" style={isMobile ? { height: `calc(100vh - 64px)`, width: `250px`, zIndex: 100, transform: !layoutIsSideBarOpen ? `translateX(-250px)` : `translateX(0px)` } : {}} className={`sidebar overflow-y-auto overflow-x-hidden transition duration-500 ease-in-out ${!layoutIsSideBarOpen && `sidebar-closed`} absolute md:static `}>
                {sidebarContent.map((sidebarItem, i) => <div key={i} className="text-darkgrey mt-16">
                    <div className="mx-6">
                        {/* Headline */}
                        <h5 className="sidebar-heading text-darkgrey text-xs uppercase font-semibold tracking-wider border-b border-lightgrey">
                            <span data-cy="sidebar-headline-span" className={`bg-white-lightgrey pr-3 transition duration-500 ease-in-out ${layoutIsSideBarOpen ? `opacity-100` : `opacity-0`}`}>{sidebarItem.title}</span>
                        </h5>
                    </div>
                    <ul>
                        {/* NavLink Items */}
                        {sidebarItem.items.map((sidebarAtom, i) => <li key={i}>
                            <NavLink to={sidebarAtom.path} onClick={() => isMobile && closeSidebar()} data-cy={`sidebar-${sidebarAtom.title}`} data-tooltip={sidebarAtom.title} className={`${layoutIsSmallSidebar ? "tooltip" : ""} whitespace-nowrap block border-l-4 border-transparent hover:bg-active-grey w-full h-full py-2 px-5`}>
                                <FontAwesomeIcon icon={sidebarAtom.icon} className="text-lg text-center mr-5" style={{ width: "24px" }} />
                                <span data-cy="sidebar-item-span" className={`transition-opacity duration-500 ease-in-out ${layoutIsSideBarOpen ? `opacity-100` : `opacity-0`}`}>{sidebarAtom.title}</span>
                            </NavLink>
                        </li>)}
                    </ul>
                </div>)}
            </nav>
            {layoutIsSideBarOpen && isMobile && <div data-cy="sidebar-content-overlay" className="sidebar-content-overlay" onClick={() => closeSidebar()} />}
        </>
    )
}