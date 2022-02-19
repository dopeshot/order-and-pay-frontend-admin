import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { IconButton } from "../../components/Buttons/IconButton"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Loading } from "../../components/UI/Loading"
import { useActions, useAppState } from "../../overmind"

export const Orders: React.FC = () => {
    // Global Actions
    const { getAllOrders, updateOrder } = useActions().orders

    // Global State
    const { orders, isLoadingOrders } = useAppState().orders

    useEffect((): void => {
        getAllOrders()
    }, [getAllOrders])

    return (
        <div className="container md:max-w-full mt-12">
            {/* Header */}
            <h1 className="text-2xl text-headline-black font-semibold">Bestellungen</h1>
            <p className="text-lightgrey mr-3 mb-4"> Gesamt</p>
            {/* Header end */}

            {/* Content */}
            {isLoadingOrders ? <Loading /> : <List lines>
                {orders.map((order) => <ListItem key={order._id} title={order._id}>
                    <IconButton className="ml-auto mr-4" icon={faTrash} />
                </ListItem>)}
            </List>}
            {/* Content End */}
        </div>
    )
}