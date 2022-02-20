import { faChair, faChevronRight, faReceipt, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { Fragment, useEffect } from "react"
import { IconButton } from "../../components/Buttons/IconButton"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { useActions, useAppState } from "../../overmind"

export const Home: React.FunctionComponent = () => {
    const { getAllOrders } = useActions().orders
    const { loadTables } = useActions().tables
    const { getAllMenus } = useActions().menus
    const { getAllAllergens } = useActions().allergens
    const { getAllUser } = useActions().users

    const { orders } = useAppState().orders
    const { tables } = useAppState().tables
    const { menus } = useAppState().menus
    const { allergens } = useAppState().allergens
    const { users } = useAppState().users

    useEffect(() => {
        getAllOrders()
        loadTables()
        getAllMenus()
        getAllAllergens()
        getAllUser()
    }, [getAllOrders, loadTables, getAllMenus, getAllAllergens, getAllUser])

    const content = [{
        title: 'Betrieb',
        items: [{
            title: 'Bestellungen',
            icon: faReceipt,
            path: `/admin/orders`,
            count: `${orders.length} Bestellungen`
        }]
    }, {
        title: 'Konfiguration',
        items: [{
            title: 'Tische',
            icon: faChair,
            path: `/admin/tables`,
            count: `${tables.length} Tische`
        }, {
            title: 'Menü',
            icon: faUtensils,
            path: `/admin/menus`,
            count: `${menus.length} Menüs`
        }, {
            title: 'Labels',
            icon: faReceipt,
            path: `/admin/menus/labels`,
            count: `${orders.length} Labels`
        }, {
            title: 'Allergene',
            icon: faReceipt,
            path: `/admin/menus/allergens`,
            count: `${allergens.length} Allergene`
        }, {
            title: 'Benutzer',
            icon: faUser,
            path: `/admin/users`,
            count: `${users.length} Benutzer`
        }],
    }]

    return (
        <div className="container mt-12">
            <h3 className="text-2xl font-bold text-headline-black">Willkommen bei Da Burger!</h3>
            <p className="text-darkgrey mb-4 md:mb-9">Eine Übersicht über alle Seiten.</p>

            {content.map((item, i) => <Fragment key={i}>
                <h4 className="text-xl font-bold text-headline-black">{item.title}</h4>
                <List lines>
                    {item.items.map((item, i) => <ListItem key={i} title={item.title} to={item.path} header={<p className="text-darkgrey">{item.count}</p>} icon={item.icon}>
                        <IconButton icon={faChevronRight} />
                    </ListItem>)}
                </List>
            </Fragment>)}
        </div>
    )
}