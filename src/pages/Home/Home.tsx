import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"


export const Home: React.FunctionComponent = () => {
    return (
        <div className="container mt-12">
            <h3 className="text-2xl font-bold">Welcome</h3>

            <Formik initialValues={{ test: "test" }} onSubmit={(values: any) => console.log(values)}>
                <Form>
                    <TextInput name="hello" labelText="test" placeholder="test" />
                    <Textarea name="test" labelText="test" placeholder="test" />
                    <Button type="submit">test</Button>
                </Form>
            </Formik>

            <Link to="/tables">Gehe zu Tabellen</Link>
            <Link className="block" to="/menus/1/categories/1/dish">Gehe zu dish erstellen</Link>
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