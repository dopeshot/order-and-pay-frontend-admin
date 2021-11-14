import { Link } from "react-router-dom"

export const Navigation: React.FunctionComponent = () => {
    return (
        <div className="block md:fixed w-full">
            <div className="">
                {/* mobile menu bar */}
                <div className="bg-gray-800 text-gray-100 flex justify-between">
                    {/* logo */}
                    <Link to="/" className="block p-4 text-white font-bold">Da Burger</Link>

                    { /* mobile menu button */}
                    <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="block md:fixed">
                <div className="sidebar hidden bg-blue-800 text-blue-100 h-screen w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transform -translate-x-full md:block md:translate-x-0 transition duration-200 ease-in-out">

                    {/* logo */}
                    <Link to="#" className="text-white flex items-center space-x-2 px-4">
                        <span className="text-2xl font-extrabold">Da Burger</span>
                    </Link>

                    {/* nav */}
                    <nav>
                        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                            Home
                        </Link>
                        <Link to="/tables" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                            Tables
                        </Link>
                        <Link to="/example" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                            Example
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}