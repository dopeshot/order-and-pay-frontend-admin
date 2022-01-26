import { useEffect } from "react"
import { Button } from "../../components/Buttons/Button"
import { useActions, useAppState } from "../../overmind"

export const Labels: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllLabels } = useActions().labels

    // Get global state
    const { labels } = useAppState().labels

    // Load labels when page is loaded
    useEffect((): void => {
        getAllLabels()
    }, [getAllLabels])

    return <div className="container md:max-w-full mt-12">
        <h1>Labels Page</h1>
        <Button kind="primary">Create Label</Button>
        {labels.map((label) => <div key={label._id}>{label.title}</div>)}
    </div>
}