import { faChair, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { AddTableModal } from "../../components/Table/AddTableModal"
import { useAppState } from "../../overmind"

export const EmptyTables: React.FunctionComponent = () => {
    const {
        app: {
            isMobile
        }
    } = useAppState()

    const [displayModal, setDisplayModal] = useState(false)

    return (
        <>
            {/* Add Table Modal */}
            {displayModal && <AddTableModal setDisplayModal={setDisplayModal} />}
            <div data-cy="empty-tables-background" className={`bg-no-repeat ${!isMobile ? 'bg-table-empty' : ""} flex flex-col justify-center`} style={{ height: "calc(100vh - 64px)" }}>
                <div className="container flex flex-col items-center md:block mb-44 md:mb-20">
                    {isMobile &&
                        <div className="flex items-center justify-center bg-primary-blue rounded-full w-24 h-24 mb-5">
                            <FontAwesomeIcon icon={faChair} className="fa-3x text-white" />
                        </div>}
                    <h1 className="text-4xl text-primary-blue font-semibold mb-3">Erstelle Tische</h1>
                    <p className="text-lg text-darkgrey text-center md:text-left mb-4">Um QR-Codes und Bestellungen zu bearbeiten, <br className="hidden sm:block" /> musst du wissen wo deine Kundschaft sitzt. </p>
                    <div className="w-full sm:w-max">
                        <Button icon={faPlus} type="button" className="w-full" onClick={() => setDisplayModal(true)}> Tisch hinzufügen</Button>
                    </div>
                </div>
            </div >
        </>
    )
}