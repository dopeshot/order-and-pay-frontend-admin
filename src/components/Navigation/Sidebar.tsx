import { NavLink } from "react-router-dom"

export const Sidebar: React.FunctionComponent = () => {
    return (
        <nav className="sidebar">
            <div className="text-darkgrey mt-16">
                {/* Heading Start */}
                <div className="mx-6">
                    <h5 className="sidebar-heading text-darkgrey text-xs uppercase font-semibold tracking-wider border-b border-lightgrey">
                        <span className="bg-white-lightgrey pr-3">Betrieb</span>
                    </h5>
                    {/* Heading End */}
                </div>
                <ul>
                    <li>
                        <NavLink to="/home" className="block hover:bg-active-grey w-full h-full py-2 px-6">
                            <i className="fa fa-home text-lg text-center mr-5" style={{ width: "24px" }}></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order" className="block hover:bg-active-grey w-full h-full py-2 px-6">
                            <i className="fa fa-receipt text-lg text-center mr-5" style={{ width: "24px" }}></i>
                            <span>Bestellungen</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="text-darkgrey mt-16">
                {/* Heading Start */}
                <div className="mx-6">
                    <h5 className="sidebar-heading text-darkgrey text-xs uppercase font-semibold tracking-wider border-b border-lightgrey">
                        <span className="bg-white-lightgrey pr-3">Konfiguration</span>
                    </h5>
                    {/* Heading End */}
                </div>
                <ul>
                    <li>
                        <NavLink to="/tables" className="block hover:bg-active-grey w-full h-full py-2 px-6">
                            <i className="fa fa-chair text-lg text-center mr-5" style={{ width: "24px" }}></i>
                            <span>Tische</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu" className="block hover:bg-active-grey w-full h-full py-2 px-6">
                            <i className="fa fa-utensils text-lg text-center mr-5" style={{ width: "24px" }}></i>
                            <span>Menü</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}