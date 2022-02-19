import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Buttons/Button'
import { Modal } from './Modal'

type DeleteModalProps = {
    /** Element that we want to delete */
    title: string
    /** Description Delete cannot be reverted and dependencies deletions */
    description: string
    /** Open State for Modal */
    open: boolean
    /** Dissmiss Function */
    onDissmis: (value: any) => void
    /** What is called when click delete button */
    handleDelete: (event: Event | void) => void
    /** Loading State for Delete */
    isLoadingDelete?: boolean
}

/**
 * Delete Modal, before finally delete something use this
 */
export const DeleteModal: React.FC<DeleteModalProps> = ({ title, open, onDissmis, handleDelete, isLoadingDelete = false, description }) => {
    return (
        <Modal modalHeading={`${title} löschen?`} open={open} onDissmis={onDissmis}>
            <p>{description}</p>
            <div className="flex md:justify-between flex-col md:flex-row">
                <Button kind="tertiary" onClick={onDissmis} className="my-4 md:my-0">Abbrechen</Button>
                <Button kind="primary" dataCy={`deletemodal-${title}-delete-button`} onClick={handleDelete} loading={isLoadingDelete} icon={faTrash} >Löschen</Button>
            </div>
        </Modal>
    )
}