import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
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
            <List>
                <ListItem onClick={() => console.log("Hello")} title="Hello" background></ListItem>
                <ListItem to="/" title="Link" icon={faTrash} indent>
                    <IconButton className="mr-4" icon={faTrash} onClick={() => console.log("child")} />
                </ListItem>
                <ListItem title="Testing" indent onClick={() => console.log("parent")}>
                    <IconButton icon={faTrash} onClick={() => console.log("child")} />
                </ListItem>
                <ListItem title="Hello" indent header={<p>Header</p>} onClick={() => console.log("parent")}>
                    <p>Children</p>
                </ListItem>
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