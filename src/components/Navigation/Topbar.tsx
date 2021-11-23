import { faBars, faBell, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import avatar from '../../img/avatar.png'
import logo from '../../img/logo.png'
import { useActions } from "../../overmind"

export const Topbar: React.FunctionComponent = () => {
    const { toggleSidebar } = useActions().app
    return (
        <div className="flex items-center bg-white shadow pr-3 md:pr-8 pl-5" style={{ height: "64px" }}>
            <button className="cursor-pointer w-10 h-10 rounded-full  hover:bg-gray-200 focus:bg-gray-200 mr-7" onClick={() => toggleSidebar()}>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
            {/* Logo */}
            <img src={logo} alt="logo" className="max-w-full mr-7 hidden md:block" />
            {/* Logo End */}
            <div className="flex flex-grow justify-end md:justify-between ">
                <div className="relative hidden md:block">
                    <span className="absolute flex items-center inset-y-0 left-0 pl-4">
                        <FontAwesomeIcon icon={faSearch} className="text-lightgrey text-sm"></FontAwesomeIcon>
                    </span>
                    <input type="text" placeholder="Search..." className="text-darkgrey border border-border-grey rounded-xl focus-visible:border-primary-blue placeholder-lightgrey w-auto md:w-80 py-2 pl-12" />
                </div>
                <div className="flex">
                    <button className="cursor-pointer w-10 h-10 rounded-full hover:bg-gray-200 focus:bg-gray-200 mr-4">
                        <FontAwesomeIcon icon={faBell} className="text-lightgrey"></FontAwesomeIcon>
                    </button>
                    <div className="flex">
                        {/* TODO: Message Dropdown */}
                        <img src={avatar} className="w-10 h-10 mr-3" alt="Avatar"></img>
                        <div className="flex flex-col justify-center">
                            <h6 className="text-darkgrey font-semibold leading-3">Da Burger</h6>
                            <small className="text-lightgrey text-xs">Admin</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}