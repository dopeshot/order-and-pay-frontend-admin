import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Modal } from "../../components/UI/Modal"
import { useActions, useAppState } from "../../overmind"

export const Labels: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllLabels, createLabel } = useActions().labels

    // Get global state
    const { labels, isLoadingLabels } = useAppState().labels

    // Component States
    const [modalOpen, setModalOpen] = useState(false)

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

        <Button kind="primary" onClick={() => createLabel({
            icon: "user",
            title: Math.random().toString()
        })}>Create Label</Button>
        <List lines>
            {labels.map((label) => <ListItem key={label._id} title={label.title} icon={label.icon as IconProp} onClick={() => console.log("List")}>
                <IconButton className="ml-auto mr-4" icon={faTrash} onClick={() => console.log("trash me")} />
            </ListItem>)}
        </List>

        <Modal modalLabel="label" modalHeading="heading" open={modalOpen} onDissmis={() => setModalOpen(false)}>
        </Modal>
    </div>
}