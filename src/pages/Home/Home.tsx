import { faChair, faChevronRight, faReceipt, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { Fragment } from "react"
import { IconButton } from "../../components/Buttons/IconButton"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"

export const Home: React.FunctionComponent = () => {
    const content = [{
        title: 'Betrieb',
        items: [{
            title: 'Bestellungen',
            icon: faReceipt,
            path: `/admin/orders`
        }]
    }, {
        title: 'Konfiguration',
        items: [{
            title: 'Tische',
            icon: faChair,
            path: `/admin/tables`
        }, {
            title: 'Menü',
            icon: faUtensils,
            path: `/admin/menus`
        }, {
            title: 'Labels',
            icon: faReceipt,
            path: `/admin/menus/labels`
        }, {
            title: 'Allergene',
            icon: faReceipt,
            path: `/admin/menus/allergens`
        }, {
            title: 'Benutzer',
            icon: faUser,
            path: `/admin/users`
        }],
    }]

    return (
        <div className="container mt-12">
            <h3 className="text-2xl font-bold text-headline-black">Willkommen bei Da Burger!</h3>
            <p className="text-darkgrey mb-4 md:mb-9">Eine Übersicht über alle Seiten.</p>

            {content.map((item, i) => <Fragment key={i}>
                <h4 className="text-xl font-bold text-headline-black">{item.title}</h4>
                <List lines>
                    {item.items.map((item, i) => <ListItem key={i} title={item.title} to={item.path} icon={item.icon}>
                        <IconButton icon={faChevronRight} />
                    </ListItem>)}
                </List>
            </Fragment>)}
        </div>
    )
}