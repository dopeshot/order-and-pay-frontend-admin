import { faChair, faHome, faReceipt, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
                </div>
                {/* Heading End */}
                <ul>
                    <li>
                        <NavLink to="/home" className="block hover:bg-active-grey w-full h-full py-2 px-6">
                            <FontAwesomeIcon icon={faHome} className="text-lg text-center mr-5" style={{ width: "24px" }}></FontAwesomeIcon>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order" className="block hover:bg-active-grey w-full h-full py-2 px-6">
                            <FontAwesomeIcon icon={faReceipt} className="text-lg text-center mr-5" style={{ width: "24px" }}></FontAwesomeIcon>
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
                </div>
                {/* Heading End */}
                <ul>
                    <li>
                        <NavLink to="/tables" className="block hover:bg-active-grey w-full h-full py-2 px-6">
                            <FontAwesomeIcon icon={faChair} className="text-lg text-center mr-5" style={{ width: "24px" }}></FontAwesomeIcon>
                            <span>Tische</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu" className="block hover:bg-active-grey w-full h-full py-2 px-6">
                            <FontAwesomeIcon icon={faUtensils} className="text-lg text-center mr-5" style={{ width: "24px" }}></FontAwesomeIcon>
                            <span>Menü</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}