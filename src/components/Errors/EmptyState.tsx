import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../Buttons/Button"

export type EmptyStateProps = {
    /** Headline */
    title: string
    /** Short little description */
    description: string
    /** Icon that is shown in the background */
    icon: IconProp
    /** Text for add button */
    buttonText: string
    /** For testing data cy of background because its hard to access */
    dataCy?: String
    /** State Setter for modalOpen */
    setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
    /** Optional: Link to add new item */
    to?: string
}

/**
 * Component that can be used when there are currently no items added
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, buttonText, dataCy, children, setModalOpen, to }) => {
    return (
        <>
            {children}
            <div data-cy={dataCy} className="flex flex-col justify-center" style={{ height: "calc(100vh - 64px)" }}>
                <div className="container flex flex-col items-center md:block mb-44 md:mb-20">
                    <div className="md:hidden flex items-center justify-center bg-primary-blue rounded-full w-24 h-24 mb-5">
                        <FontAwesomeIcon icon={icon} className="fa-3x text-white" />
                    </div>
                    <h1 className="text-4xl text-primary-blue font-semibold mb-3">{title}</h1>
                    <p className="text-lg text-darkgrey text-center md:text-left mb-4" style={{ maxWidth: "500px" }}>{description}</p>
                    {!to && setModalOpen ?
                        <Button icon={faPlus} type="button" onClick={() => setModalOpen(true)}>{buttonText}</Button>
                        :
                        <div className="w-full md:w-max">
                            <Button icon={faPlus} type="button" to={to}>{buttonText}</Button>
                        </div>}
                </div>
            </div >
        </>
    )
}