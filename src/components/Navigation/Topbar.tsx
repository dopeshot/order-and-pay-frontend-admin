import { faBars, faChevronDown, faSearch, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import avatar from '../../img/avatar.png'
import logo from '../../img/logo.png'
import { useActions, useAppState } from "../../overmind"
import { IconButton } from "../Buttons/IconButton"
import { Search } from "../Search/Search"

export const Topbar: React.FunctionComponent = () => {
    const { toggleSidebar } = useActions().app
    const { isMobile } = useAppState().app

    const { logout } = useActions().auth
    const { currentUser } = useAppState().auth

    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (
        <div className="flex items-center bg-white shadow pr-3 md:pr-8 pl-5" style={{ height: "64px" }}>
            {/* Hamburger Button */}
            <IconButton dataCy="topbar-hamburger-button" icon={faBars} textColor="text-darkgrey" onClick={() => toggleSidebar()} className="mr-2 md:mr-4" />

            {/* Logo */}
            <img src={logo} alt="logo" className="hidden md:block max-w-full mr-7" />

            <div className="flex flex-grow justify-end md:justify-between">
                {/* Search Desktop */}
                <Search />
                <div className="flex">
                    {/* Search Mobile */}
                    {isMobile && <IconButton dataCy="topbar-search-iconbutton" icon={faSearch} textColor="text-lightgrey" onClick={() => ""} className="mr-2 md:mr-4" />}

                    {/* Account */}
                    <div className="relative inline-block">
                        {/* When dropdown open click outside close it */}
                        {dropdownOpen && <div className="fixed inset-0 h-full w-full z-10" aria-hidden="true" onClick={() => setDropdownOpen(false)}></div>}

                        <div className="flex items-center cursor-pointer mr-3" onClick={() => { setDropdownOpen(true) }} >
                            <img src={avatar} className="w-10 h-10 mr-3" alt="Avatar" />
                            <h6 className="text-darkgrey font-semibold leading-5">{currentUser?.username}</h6>
                            <FontAwesomeIcon icon={faChevronDown} className="text-darkgrey ml-3" />
                        </div>

                        {/* Dropdown */}
                        {dropdownOpen && <div className="absolute z-20 bg-white rounded-lg shadow mt-2" tabIndex={-1}>
                            <button onClick={() => logout()} className="flex items-center text-darkgrey px-4 py-2" tabIndex={-1}>
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                                Ausloggen
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}