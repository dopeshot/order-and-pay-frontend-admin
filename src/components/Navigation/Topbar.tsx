import { faBars, faBell, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import avatar from '../../img/avatar.png'
import logo from '../../img/logo.png'
import { toggleSidebar } from "../../services/utilities"

export const Topbar: React.FunctionComponent = () => {
    return (
        <div className="flex items-center bg-white shadow pl-3 md:pl-8" style={{ height: "64px" }}>
            <button className="cursor-pointer mr-7" onClick={() => toggleSidebar()}>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
            {/* Logo */}
            <img src={logo} alt="logo" className="max-w-full" />
            {/* Logo End */}
            <div className="flex justify-between items-center w-full mx-3 sm:mx-20">
                <form>
                    <div className="relative">
                        <span className="absolute flex items-center inset-y-0 left-0 pl-4">
                            <FontAwesomeIcon icon={faSearch} className="text-lightgrey text-sm"></FontAwesomeIcon>
                        </span>
                        <input type="text" placeholder="Search..." className="text-darkgrey border border-border-grey rounded-xl focus-visible:border-primary-blue placeholder-lightgrey w-auto md:w-80 py-2 pl-12" />
                    </div>
                </form>
                <div className="grid grid-cols-3 justify-items-end items-center">
                    {/* TODO: Message Dropdown */}
                    <FontAwesomeIcon icon={faBell} className="text-lightgrey"></FontAwesomeIcon>
                    <img src={avatar} className="pr-3" alt="Avatar"></img>
                    <div className="whitespace-nowrap">
                        <h6 className="text-darkgrey font-semibold h-4">Da Burger</h6>
                        <small className="text-lightgrey text-xs">Admin</small>
                    </div>
                </div>
            </div>
        </div>
    )
}