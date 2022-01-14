import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Search: React.FunctionComponent = () => {
    return (
        <div className="relative hidden md:block">
            <span className="absolute flex items-center inset-y-0 left-0 pl-4">
                <FontAwesomeIcon icon={faSearch} className="text-lightgrey text-sm" />
            </span>
            <input type="search" placeholder="Search..." className="rounded-xl placeholder-lightgrey w-auto md:w-80 py-2 pl-12" />
        </div>
    )
}