import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useAppState } from "../../overmind"
import { Button } from "../Buttons/Button"
import { AddTableModal } from "../Table/AddTableModal"

export type EmptyItemsProps = {
    /** Icon that is shown in the background */
    icon: IconProp
    /** Text for add button */
    buttonText: string
    /** For testing data cy of background because its hard to access */
    dataCy?: String
}

/**
 * Component that can be used when there are currently no items added
 */
export const NoItems: React.FC<EmptyItemsProps> = ({ icon, buttonText, dataCy }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const { isMobile } = useAppState().app

    return (
        <>
            <AddTableModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <div data-cy={dataCy} className={`bg-no-repeat ${!isMobile ? 'bg-table-empty' : ""} flex flex-col justify-center`} style={{ height: "calc(100vh - 64px)" }}>
                <div className="container flex flex-col items-center md:block mb-44 md:mb-20">
                    {isMobile &&
                        <div className="flex items-center justify-center bg-primary-blue rounded-full w-24 h-24 mb-5">
                            <FontAwesomeIcon icon={icon} className="fa-3x text-white" />
                        </div>}
                    <h1 className="text-4xl text-primary-blue font-semibold mb-3">Erstelle Tische</h1>
                    <p className="text-lg text-darkgrey text-center md:text-left mb-4">Um QR-Codes und Bestellungen zu bearbeiten, <br className="hidden sm:block" /> musst du wissen wo deine Kundschaft sitzt. </p>
                    <div className="w-full sm:w-max">
                        <Button icon={faPlus} type="button" className="w-full" onClick={() => setModalOpen(true)}>{buttonText}</Button>
                    </div>
                </div>
            </div >
        </>
    )
}