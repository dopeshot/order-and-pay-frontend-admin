import { faPlus, faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { List } from "../../components/Lists/List"
import { ListItem } from "../../components/Lists/ListItem"
import { DeleteModal } from "../../components/Modals/DeleteModal"
import { UsersModal } from "../../components/Modals/UsersModal"
import { Loading } from "../../components/ProgressIndicators/Loading"
import { useActions, useAppState } from "../../overmind"
import { User } from "../../overmind/users/type"
import { setDocumentTitle } from "../../services/setDocumentTitle"

export const Users: React.FC = () => {
    // Global States
    const { getAllUser, deleteUser } = useActions().users
    const { users } = useAppState().users

    // Local States
    const [isLoadingUsers, setIsLoadingUsers] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditData, setModalEditData] = useState<User | null>(null)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    useEffect((): void => {
        async function loadUsers() {
            try {
                await getAllUser()
            } catch (error) {
                // Loading users failed
            } finally {
                setIsLoadingUsers(false)
            }
        }
        loadUsers()
        setDocumentTitle("Benutzer")
    }, [getAllUser])

    const handleDelete = async (event: any) => {
        /* istanbul ignore next // should not happen just fallback */
        if (!selectedUser) {
            console.warn("There is no user selected.")
            return
        }

        setIsLoadingDelete(true)

        // Delete the user and close modal when succesfull
        if (await deleteUser(selectedUser._id))
            closeDeleteModal()

        setIsLoadingDelete(false)

        // When user is delete update List
        await getAllUser()
    }

    const openDeleteModal = (user: User) => {
        setSelectedUser(user)
        setDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false)
        setSelectedUser(null)
    }

    return (
        <div className="container md:max-w-full mt-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                    <h1 className="text-2xl text-headline-black font-semibold">Benutzer</h1>
                    <p data-cy="users-count" className="text-lightgrey mr-3 mb-4">{users.length ?? 0} Gesamt</p>
                </div>
                <div>
                    <Button icon={faPlus} onClick={() => setModalOpen(true)}>Benutzer hinzuf??gen</Button>
                </div>
            </div>
            {/* Header end */}

            {/* Content */}
            {(users.length === 0 && isLoadingUsers) ? <Loading /> : <List lines>
                {users.map((user) => <ListItem dataCy="users-list-item" key={user._id} title={user.username} header={<p className="text-darkgrey">{user.email}</p>} icon={faUser} onClick={() => {
                    setModalEditData(user)
                    setModalOpen(true)
                }}>
                    <IconButton dataCy="users-delete-button" className="ml-auto mr-4" icon={faTrash} onClick={() => openDeleteModal(user)} />
                </ListItem>)}
            </List>
            }
            {/* Content End */}

            {/* Add/Edit User Modal */}
            <UsersModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalEditData={modalEditData} setModalEditData={setModalEditData} />

            {/* Delete Modal */}
            <DeleteModal
                title={`${selectedUser?.username}`}
                description="Das L??schen kann nicht r??ckg??ngig gemacht werden."
                open={isDeleteModalOpen}
                onDissmis={closeDeleteModal}
                handleDelete={handleDelete}
                isLoadingDelete={isLoadingDelete}
            />
        </div>
    )
}