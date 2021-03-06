import { faCheck, faSync, faTrash, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { Fragment, useEffect, useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { Chip, ChipTypesEnum } from "../../components/Chips/Chip"
import { List } from "../../components/Lists/List"
import { ListItem } from "../../components/Lists/ListItem"
import { Loading } from "../../components/ProgressIndicators/Loading"
import { useActions, useAppState } from "../../overmind"
import { OrderDto, OrderStatus, PaymentStatus } from "../../overmind/orders/type"
import { numberToPrice } from "../../services/numberToPrice"
import { setDocumentTitle } from "../../services/setDocumentTitle"

export const Orders: React.FC = () => {
    // Global Actions
    const { getAllOrders, updateOrder } = useActions().orders

    // Global State
    const { orders } = useAppState().orders

    const [isLoadingOrders, setIsLoadingOrders] = useState(false)

    useEffect((): void => {
        async function loadOrders() {
            try {
                await getAllOrders()
            } catch (error) {
                // Failed loading orders
            } finally {
                setIsLoadingOrders(false)
            }
        }
        loadOrders()
        setDocumentTitle("Bestellungen")
    }, [getAllOrders])

    const updateOrderHandler = (id: string, type: "edit" | "close" | "delete") => {
        let order: OrderDto

        switch (type) {
            case "edit":
                order = {
                    status: OrderStatus.IN_PROGRESS
                }
                updateOrder({ id, order })
                break
            case "close":
                order = {
                    status: OrderStatus.FINISHED
                }
                updateOrder({ id, order })
                // Refresh when order is completed
                getAllOrders()
                break
            case "delete":
                order = {
                    status: OrderStatus.CANCELLED,
                    paymentStatus: PaymentStatus.CANCELED
                }
                updateOrder({ id, order })
                // Refresh when order is deleted
                getAllOrders()
                break
        }


    }

    const beautifyOrderStatus: { [key in OrderStatus]: {
        title: string,
        type: ChipTypesEnum
    }
    } = {
        [OrderStatus.RECEIVED]: {
            title: "Eingetroffen",
            type: ChipTypesEnum.blue
        },
        [OrderStatus.IN_PROGRESS]: {
            title: "In Arbeit",
            type: ChipTypesEnum.yellow
        },
        [OrderStatus.FINISHED]: {
            title: "Abgeschlossen",
            type: ChipTypesEnum.green
        },
        [OrderStatus.CANCELLED]: {
            title: "Abgebrochen",
            type: ChipTypesEnum.red
        },
        [OrderStatus.RETURNED]: {
            title: "Zur??ckgegeben",
            type: ChipTypesEnum.dark
        }
    }

    return (
        <div className="container md:max-w-full mt-12">
            {/* Header */}
            <h1 className="text-2xl text-headline-black font-semibold">Bestellungen</h1>
            <p className="text-lightgrey mr-3 mb-4"> Gesamt</p>
            {/* Header end */}

            {/* JS NOTE: The Design of this is not finished, just a debug version of it */}
            {/* Content */}
            {(orders.length === 0 && isLoadingOrders) ? <Loading /> : <List>
                {orders.map((order) => <Fragment key={order._id}>
                    <ListItem title={`#${order._id.slice(order._id.length - 3)}`} icon="shopping-basket" background header={<><p className="pr-4">Tisch: {order.table.tableNumber}</p><Chip title={beautifyOrderStatus[order.status]?.title} type={beautifyOrderStatus[order.status]?.type} /></>}>
                        <h6 className="text-headline-black text-lg font-semibold mr-3">{numberToPrice(order.price)}</h6>
                        <Button kind="tertiary" icon={faSync} className="text-darkgrey mr-4" onClick={() => updateOrderHandler(order._id, "edit")}>Wird Bearbeitet</Button>
                        <Button kind="tertiary" icon={faCheck} className="text-darkgrey mr-4" onClick={() => updateOrderHandler(order._id, "close")}>Abschlie??en</Button>
                        <Button kind="tertiary" icon={faTrash} className="text-darkgrey mr-4" onClick={() => updateOrderHandler(order._id, "delete")}>L??schen</Button>
                    </ListItem>
                    {order.items.map(item => (
                        <ListItem key={order._id + item.dishId + item.count + item.note} title={`${item.count}x ${item.dishName}`} icon={faUtensils} indent header={<p>{item.note}</p>}>
                            {item.pickedChoices.map(pickedChoice => <Fragment key={order._id + item.dishId + item.count + item.note + pickedChoice.id}>
                                {pickedChoice.optionNames.length !== 0 && <>
                                    <h6 className="font-semibold pl-3">{pickedChoice.title}</h6>
                                    <p className="pl-3">{pickedChoice.optionNames.join(", ")}</p>
                                </>}
                            </Fragment>)}
                        </ListItem>
                    ))}
                </Fragment>)}
            </List>}
            {/* Content End */}
        </div>
    )
}