import { faBars, faBell, faSearch } from "@fortawesome/free-solid-svg-icons"
import avatar from '../../img/avatar.png'
import logo from '../../img/logo.png'
import { useActions, useAppState } from "../../overmind"
import { IconButton } from "../IconButton/IconButton"
import { Search } from "../Search/Search"

export const Topbar: React.FunctionComponent = () => {
    const { toggleSidebar } = useActions().app
    const { isMobile } = useAppState().app

    return (
        <div className="flex items-center bg-white shadow pr-3 md:pr-8 pl-5" style={{ height: "64px" }}>
            {/* Hamburger Button */}
            <IconButton icon={faBars} textColor="text-darkgrey" onClick={() => toggleSidebar()} />

            {/* Logo */}
            <img src={logo} alt="logo" className="hidden md:block max-w-full mr-7" />
 
            <div className="flex flex-grow justify-end md:justify-between">
                {/* Search Desktop */}
                <Search />
                <div className="flex">
                    {/* Search Mobile */}
                    {isMobile && <IconButton icon={faSearch} textColor="text-lightgrey" onClick={() => ""} />}

                    {/* Notification */}
                    <IconButton icon={faBell} textColor="text-lightgrey" onClick={() => ""} />

                    {/* Account */}
                    <div className="flex">
                        <img src={avatar} className="w-10 h-10 mr-3" alt="Avatar" />
                        <div className="flex flex-col justify-center">
                            <h6 className="text-darkgrey font-semibold leading-5">Da Burger</h6>
                            <small className="text-lightgrey text-xs">Admin</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}