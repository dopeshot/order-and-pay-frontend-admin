import { NavLink } from "react-router-dom"

export const Sidebar: React.FunctionComponent = () => {
    return (
        <nav className="sidebar">
            <div className="mt-16">
                {/* Heading Start */}
                <h5 className="sidebar-heading text-darkgrey text-xs uppercase font-semibold tracking-wider border-b border-lightgrey">
                    <span className="bg-white-lightgrey pr-3">Betrieb</span>
                </h5>
                {/* Heading End */}
                <ul>
                    <li className="text-darkgrey mb-2">
                        <i className="fa fa-home text-lg text-center mr-5" style={{ width: "24px" }}></i>
                        <NavLink to="/" activeClassName="selected">Dashboard</NavLink>
                    </li>
                    <li className="text-darkgrey">
                        <i className="fa fa-receipt text-lg text-center mr-5" style={{ width: "24px" }}></i>
                        <NavLink to="/">Bestellungen</NavLink>
                    </li>
                </ul>
            </div>
            <div className="mt-16">
                {/* Heading Start */}
                <h5 className="sidebar-heading text-darkgrey text-xs uppercase font-semibold tracking-wider border-b border-lightgrey">
                    <span className="bg-white-lightgrey pr-3">Konfiguration</span>
                </h5>
                {/* Heading End */}
                <ul>
                    <li className="text-darkgrey mb-2">
                        <i className="fa fa-chair text-lg text-center mr-5" style={{ width: "24px" }}></i>
                        <NavLink to="/tables" >Tische</NavLink>
                    </li>
                    <li className="text-darkgrey">
                        <i className="fa fa-utensils text-lg text-center mr-5" style={{ width: "24px" }}></i>
                        <NavLink to="/">Menü</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}