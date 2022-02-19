import { faEdit, faHeart, faLink, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Tag, TagTypesEnum } from "../../components/UI/Tag"
import { useActions } from "../../overmind"


export const Home: React.FunctionComponent = () => {
    const { createNotification } = useActions().notify
    const debug = () => {
        createNotification({
            title: "Error occured",
            message: "Error while fetching",
            type: "danger"
        })
    }
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

            <Link to="/admin/tables">Gehe zu Tabellen</Link>
            <Link to="/login">Gehe zu Login</Link>
            <Link to="/admin/menus/1/edit">Gehe zu Menu Overview</Link>
            <Button onClick={() => debug()}>Debug</Button>
            <List lines>
                <ListItem onClick={() => console.log("parent")} title="Hobbies" background></ListItem>
                <ListItem title="Football" indent onClick={() => console.log("parent")} header={<Tag title="Favorite" />}>
                    <IconButton icon={faHeart} className="mr-2" onClick={() => console.log("like")} />
                    <IconButton icon={faEdit} className="mr-2" onClick={() => console.log("edit")} />
                    <IconButton icon={faTrash} onClick={() => console.log("remove")} />
                </ListItem>
                <ListItem title="Hello" indent header={<p>Header</p>} onClick={() => console.log("parent")}>
                    <p>Children</p>
                </ListItem>
                <ListItem to="/admin/home" title="Links" background>
                    <IconButton icon={faHeart} className="mr-2" onClick={() => console.log("like")} />
                </ListItem>
                <ListItem to="/admin/home" title="Facebook" header={<Tag title="Trending" type={TagTypesEnum.green} />}>
                    <IconButton icon={faLink} className="mr-2" to="/home" />
                    <IconButton icon={faHeart} className="mr-2" onClick={() => console.log("like")} />
                </ListItem>
            </List>
        </div>
    )
}