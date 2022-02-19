import { faCheck, faSync, faTrash, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { Fragment, useEffect } from "react"
import { Button } from "../../components/Buttons/Button"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Loading } from "../../components/UI/Loading"
import { useActions, useAppState } from "../../overmind"
import { numberToPrice } from "../../services/numberToPrice"

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

            {/* JS NOTE: The Design of this is not finished, just a debug version of it */}
            {/* Content */}
            {isLoadingOrders ? <Loading /> : <List>
                {orders.map((order) => <Fragment key={order._id}>
                    <ListItem title={`#${order._id}`} icon="shopping-basket" background header={<p>Tisch: {order.tableId}</p>}>
                        <h6 className="text-headline-black text-lg font-semibold mr-3">{numberToPrice(order.price)}</h6>
                        <Button kind="tertiary" icon={faSync} className="text-darkgrey mr-4">Wird Bearbeitet</Button>
                        <Button kind="tertiary" icon={faCheck} className="text-darkgrey mr-4">Abschließen</Button>
                        <Button kind="tertiary" icon={faTrash} className="text-darkgrey mr-4">Löschen</Button>
                    </ListItem>
                    {order.items.map(item => (
                        <ListItem key={item.dishId} title={`${item.count}x ${item.dishId}`} icon={faUtensils} indent header={<p>{item.note}</p>}>
                            <p>{item.pickedChoices.id}:</p>
                            {item.pickedChoices.valueId.map(value => (
                                <p className="pl-3">{value}</p>
                            ))}
                        </ListItem>
                    ))}
                </Fragment>)}
            </List>}
            {/* Content End */}
        </div>
    )
}