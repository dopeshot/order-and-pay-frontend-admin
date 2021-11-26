import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useActions } from "../../overmind"
import { ErrorBanner } from "../Errors/ErrorBanner"
import { PrimaryButton } from "../Buttons/PrimaryButton"
import { SecondaryButton } from "../Buttons/SecondaryButton"

type TableModalProps = {
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddTableModal: React.FunctionComponent<TableModalProps> = (props) => {
    const peopleCountTemplates = [2, 4, 6]
    const errorList: string[] = [
        "Your password must be at least 8 characters",
        "Your password must include at least one pro wrestling finishing move"
    ]

    const [tableNumber, setTableNumber] = useState("")
    const [peopleCount, setPeopleCount] = useState<number>()
    const [error] = useState(false)

    const { createTable } = useActions().tables

    return (
        <div className="fixed z-10 inset-0" aria-labelledby="add-table" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                {/* Background overlay */}
                <div className="fixed inset-0 bg-modal-bg-blue bg-opacity-50 transition-opacity" aria-hidden="true" onClick={() => props.setDisplayModal(false)} /> 
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* Modal */}
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-full px-8 py-8 sm:align-middle sm:max-w-md sm:my-8 sm:p-10">
                    <div className="bg-white mb-5">
                        <h1 className="text-headline-black text-2xl font-semibold mb-4">Neuer Tisch</h1>

                        {/* Error Banner */}
                        {error && <ErrorBanner headlineContent="There where 2 Errors with your submittion" listContent={errorList} />}

                        {/* Tablenumber Input with Label */}
                        <label className="block text-darkgrey text-sm font-semibold pb-2" htmlFor="tablenumber">Tischnummer</label>
                        <input type="text" id="tablenumber" name="tablenumber" value={tableNumber} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTableNumber(event.target.value)} minLength={1} maxLength={8} placeholder="A1" className="font-roboto border border-border-grey rounded-xl w-full mb-5 pl-4 py-2 sm:w-1/2" />

                        {/* Peoplecount Input with Label */}
                        <label className="block text-darkgrey text-sm font-semibold pb-2" htmlFor="tablenumber">Personenanzahl</label>
                        <input type="number" pattern="[0-9]*" id="tablenumber" name="tablenumber" value={peopleCount || ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPeopleCount(parseInt(event.target.value))} min={1} max={100} placeholder="2" className="font-roboto border border-border-grey rounded-xl w-full pl-4 py-2 mb-3 sm:w-1/2 sm:mb-0" />

                        {/* Peoplecount Quick */}
                        <div className="flex sm:inline-flex sm:justify-between sm:w-1/2 sm:pl-3">
                            {peopleCountTemplates.map((peopleCountTemplate, index) => (
                                <button key={`ppl_${index}${peopleCountTemplate}`} onClick={() => setPeopleCount(peopleCountTemplate)} className={`flex justify-center items-center hover:bg-primary-blue-hover focus:bg-primary-blue-hover focus:shadow-focus hover:text-white focus:text-white border border-primary-blue ${peopleCount === peopleCountTemplate ? `bg-primary-blue text-white` : `text-primary-blue`} rounded-full mr-4 sm:mr-0`} style={{ minWidth: "50px", minHeight: "50px" }}>
                                    <p className="font-semibold font-roboto">{peopleCountTemplate}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex sm:flex-row-reverse sm:justify-between">
                        {/* Save and Cancel Buttons */}
                        <PrimaryButton icon={faCheck} content="Speichern" onClick={() => { 
                            createTable({ tableNumber: tableNumber, capacity: peopleCount! })
                            props.setDisplayModal(false)
                        }} />
                        <SecondaryButton content="Abbrechen" onClick={() => props.setDisplayModal(false)} />
                    </div>
                </div>
                {/* Modal End */}
            </div>
        </div>
    )
}