import { toggleSidebar } from "../../services/utilities"
import logo from '../../img/logo.png'

export const Topbar: React.FunctionComponent = () => {
    return (
        <div className="flex items-center bg-white shadow" style={{ height: "64px" }}>
            <div className="flex mx-5">
                <button className="cursor-pointer mr-4" onClick={() => toggleSidebar()}>
                    <i className="fas fa-bars"></i>
                </button>
                {/* Logo */}
                <img src={logo} alt="logo" />
                {/* Logo End */}
            </div>
        </div>
    )
}