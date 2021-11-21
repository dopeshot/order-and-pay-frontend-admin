import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { showHideElement } from "../../services/utilities"


export const AddTableModal: React.FunctionComponent = () => {
    return (
        <div className="fixed z-10 inset-0" aria-labelledby="add-table" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                {/* Background overlay */}
                <div className="fixed inset-0 bg-modal-bg-blue bg-opacity-50 transition-opacity" aria-hidden="true" onClick={() => showHideElement('#table-modal')}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* Modal */}
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-full px-8 py-8 sm:align-middle sm:max-w-md sm:my-8 sm:p-10">
                    <div className="bg-white mb-5">
                        <h1 className="text-headline-black text-2xl font-semibold mb-4">Neuer Tisch</h1>
                        <form>
                            <label className="block text-darkgrey text-sm font-semibold pb-2" htmlFor="tablenumber">Tischnummer</label>
                            <input type="text" id="tablenumber" name="tablenumber" minLength={1} maxLength={16} placeholder="A1" className="font-roboto border border-border-grey rounded-xl w-full mb-5 pl-4 py-2 sm:w-1/2" />

                            <label className="block text-darkgrey text-sm font-semibold pb-2" htmlFor="tablenumber">Personenanzahl</label>
                            <input type="number" id="tablenumber" name="tablenumber" min={1} max={100} placeholder="2" className="font-roboto border border-border-grey rounded-xl w-full pl-4 py-2 mb-3 sm:w-1/2 sm:mb-0" />
                            
                            <div className="flex sm:inline-flex sm:justify-between sm:w-1/2 sm:pl-3">
                                <button className="flex justify-center items-center border border-primary-blue rounded-full mr-4 sm:mr-0" style={{ minWidth: "50px", minHeight: "50px" }}>
                                    <p className="text-primary-blue font-semibold font-roboto">2</p>
                                </button>
                                <button className="flex justify-center items-center border border-primary-blue rounded-full mr-4 sm:mr-0" style={{ minWidth: "50px", minHeight: "50px" }}>
                                    <p className="text-primary-blue font-semibold font-roboto">4</p>
                                </button>
                                <button className="flex justify-center items-center border border-primary-blue rounded-full mr-4 sm:mr-0" style={{ minWidth: "50px", minHeight: "50px" }}>
                                    <p className="text-primary-blue font-semibold font-roboto">6</p>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col sm:flex sm:flex-row-reverse sm:justify-between">
                        <button className="bg-primary-blue text-white font-semibold border border-transparent rounded-xl py-2 px-9 sm:mt-0 sm:w-auto">
                            <FontAwesomeIcon icon={faCheck} className="text-sm mr-3"></FontAwesomeIcon>
                            Speichern
                        </button>
                        <button type="button" onClick={() => showHideElement('#table-modal')}className="text-primary-blue font-semibold mt-2 py-2 sm:mt-0 sm:py-0">
                            Abbrechen
                        </button>
                    </div>
                </div>
                {/* Modal End */}
            </div>
        </div>
    )
}