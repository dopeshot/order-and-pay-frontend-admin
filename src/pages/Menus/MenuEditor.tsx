import { useParams } from "react-router-dom"

type Params = {
    id: string
}

export const MenuEditor: React.FC = () => {
    const { id } = useParams<Params>()
    return <>
        <h1>Menu Editor</h1>
        <p>Id: {id}</p>
    </>
}