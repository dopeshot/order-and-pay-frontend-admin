import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"


export const Home: React.FunctionComponent = () => {
    return (
        <div className="container mt-12">
            <h3 className="text-2xl font-bold">Welcome</h3>
            <Link to="/tables">Gehe zu Tabellen</Link>
            <List>
                <ListItem onClick={() => console.log("Hello")} title="Hello" background></ListItem>
                <ListItem to="/" title="Hello" icon={faTrash} indent></ListItem>
                <ListItem title="Hello" indent></ListItem>
                <ListItem title="Hello" indent></ListItem>
            </List>

            <List lines>
                <ListItem to="/" title="Hello"></ListItem>
                <ListItem title="Hello"></ListItem>
                <ListItem title="Hello"></ListItem>
                <ListItem title="Hello"></ListItem>
            </List>
        </div>
    )
}