import { useParams } from "react-router-dom"

export const CategoryEditor: React.FunctionComponent = () => {
    const { categoryid } = useParams<{ categoryid: string, menuid: string }>()

    return (
        <div className="container md:max-w-full mt-12">
            <h1 className="text-2xl text-headline-black font-semibold">{categoryid ? "Kategorie bearbeiten" : "Neue Kategorie"}</h1>
        </div>
    )
}