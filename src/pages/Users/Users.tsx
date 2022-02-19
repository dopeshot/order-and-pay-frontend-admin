import { faPlus, faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { UsersModal } from "../../components/Users/UsersModal"
import { useActions, useAppState } from "../../overmind"
import { User } from "../../overmind/users/effects"

export const Users: React.FC = () => {
    const { getAllUser } = useActions().users
    const { users } = useAppState().users

    const [isLoading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditData, setModalEditData] = useState<User | null>(null)

    useEffect((): void => {
        async function loadUsers() {
            if (await getAllUser())
                setLoading(false)
        }
        loadUsers()
    }, [getAllUser])

    return (
        <div className="container md:max-w-full mt-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                    <h1 className="text-2xl text-headline-black font-semibold">Benutzer</h1>
                    <p className="text-lightgrey mr-3 mb-4">{!isLoading ? users.length : 0} Gesamt</p>
                </div>
                <div>
                    <Button icon={faPlus} onClick={() => setModalOpen(true)}>Benutzer hinzufügen</Button>
                </div>
            </div>
            {/* Header end */}

            {/* Content */}
            <List lines>
                {users.map((user) => <ListItem key={user._id} title={user.username} header={<p className="text-darkgrey">{user.email}</p>} icon={faUser} onClick={() => {
                    setModalEditData(user)
                    setModalOpen(true)
                }}>
                    <IconButton className="ml-auto mr-4" icon={faTrash} onClick={() => ""} />
                </ListItem>)}
            </List>
            {/* Content End */}

            {/* Add/Edit User Modal */}
            <UsersModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalEditData={modalEditData} setModalEditData={setModalEditData} />
        </div>
    )
}