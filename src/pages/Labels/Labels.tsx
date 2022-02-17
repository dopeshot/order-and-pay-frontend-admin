import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { LabelModal } from "../../components/Labels/LabelModal"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { useActions, useAppState } from "../../overmind"
import { Label } from "../../overmind/labels/state"

export const Labels: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllLabels, deleteLabel } = useActions().labels

    // Get global state
    const { labels, isLoadingLabels } = useAppState().labels

    // Component States
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditData, setModalEditData] = useState<Label | null>(null)

    // Load labels when page is loaded
    useEffect((): void => {
        getAllLabels()
    }, [getAllLabels])

    return <div className="container md:max-w-full mt-12">
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Labels</h1>
                <p className="text-lightgrey mr-3 mb-4">{!isLoadingLabels ? labels.length : 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} onClick={() => setModalOpen(true)}>Label hinzufügen</Button>
            </div>
        </div>
        <List lines>
            {labels.map((label) => <ListItem key={label._id} title={label.title} icon={label.icon as IconProp} onClick={() => {
                setModalEditData(label)
                setModalOpen(true)
            }}>
                <IconButton className="ml-auto mr-4" icon={faTrash} onClick={() => deleteLabel(label._id)} />
            </ListItem>)}
        </List>

        <LabelModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalEditData={modalEditData} setModalEditData={setModalEditData} />
    </div>
}