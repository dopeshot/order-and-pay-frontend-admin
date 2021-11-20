import { toggleSidebar } from "../../services/utilities"
import logo from '../../img/logo.png'

export const Topbar: React.FunctionComponent = () => {
    return (
        <div className="flex items-center bg-white shadow pl-3 md:pl-8" style={{ height: "64px" }}>
            <button className="cursor-pointer mr-7" onClick={() => toggleSidebar()}>
                <i className="fas fa-bars"></i>
            </button>
            {/* Logo */}
            <img src={logo} alt="logo" className="max-w-full" />
            {/* Logo End */}
            <div className="container">
                <div className="search-wrapper inline-block relative">
                    <input type="text" placeholder="Search..." className="border border-border-grey rounded-xl focus-visible:border-primary-blue placeholder-lightgrey w-auto md:w-80 py-2 pl-12"></input>
                </div>
            </div>
        </div>
    )
}