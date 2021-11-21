import { toggleSidebar } from "../../services/utilities"
import logo from '../../img/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faBell, faSearch } from "@fortawesome/free-solid-svg-icons"

export const Topbar: React.FunctionComponent = () => {
    return (
        <div className="flex items-center bg-white shadow pl-3 md:pl-8" style={{ height: "64px" }}>
            <button className="cursor-pointer mr-7" onClick={() => toggleSidebar()}>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
            {/* Logo */}
            <img src={logo} alt="logo" className="max-w-full" />
            {/* Logo End */}
            <div className="container flex items-center justify-between">
                <form>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                            <FontAwesomeIcon icon={faSearch} className="text-lightgrey text-sm"></FontAwesomeIcon>
                        </span>
                        <input type="text" placeholder="Search..." className="text-darkgrey border border-border-grey rounded-xl focus-visible:border-primary-blue placeholder-lightgrey w-auto md:w-80 py-2 pl-12" />
                    </div>
                </form>
                <div>
                    <FontAwesomeIcon icon={faBell} className="text-lightgrey"></FontAwesomeIcon>
                </div>
            </div>
        </div>
    )
}