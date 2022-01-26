import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { useEffect } from "react"
import { Button } from "../../components/Buttons/Button"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { useActions, useAppState } from "../../overmind"

export const Labels: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllLabels, createLabel } = useActions().labels

    // Get global state
    const { labels } = useAppState().labels

    // Load labels when page is loaded
    useEffect((): void => {
        getAllLabels()
    }, [getAllLabels])

    return <div className="container md:max-w-full mt-12">
        <h1>Labels Page</h1>
        <Button kind="primary" onClick={() => createLabel({
            icon: "user",
            title: Math.random().toString()
        })}>Create Label</Button>
        <List lines>
            {labels.map((label) => <ListItem key={label._id} title={label.title} icon={label.icon as IconProp}></ListItem>)}

        </List>
    </div>
}