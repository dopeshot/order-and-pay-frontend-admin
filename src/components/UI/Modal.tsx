import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { IconButton } from "../Buttons/IconButton"

type TextareaProps = {
    /** Is in the header of the modal, the title */
    modalHeading: string
    /** Is in the header of the modal, the subtitle. This is optional */
    modalLabel?: string
    /** State for Modal */
    open: boolean
    /** Setter for State from Modal */
    onDissmis: (value: any) => void
}

/**
 * Modal, lays over other content
 */
export const Modal: React.FC<TextareaProps> = ({ modalHeading, modalLabel, open, onDissmis, children }) => {
    return (
        <>
            {open &&
                <div className="fixed z-10 inset-0" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        {/* Background overlay */}
                        <div className="fixed inset-0 bg-modal-bg-blue bg-opacity-50 transition-opacity" aria-hidden="true" onClick={onDissmis} />
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        {/* Modal Content*/}
                        <div className="inline-block align-bottom bg-white rounded-2xl overflow-hidden text-left shadow-xl transform transition-all w-full px-8 py-8 sm:align-middle sm:max-w-md sm:my-8 sm:p-10">
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="text-darkgrey font-semibold">{modalLabel}</h5>
                                    <h2 className="text-headline-black text-2xl font-semibold mb-2">{modalHeading}</h2>
                                </div>
                                <IconButton onClick={onDissmis} icon={faTimes}></IconButton>
                            </div>
                            {children}
                        </div>
                        {/* Modal Content End */}
                    </div>
                </div>
            }
        </>
    )
}