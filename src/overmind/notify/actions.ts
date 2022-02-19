import { NotificationTitleMessage, NOTIFICATION_TYPE, Store } from "react-notifications-component";
import { Context } from "..";

export type NotificationData = {
    title: NotificationTitleMessage
    message: NotificationTitleMessage
    type: NOTIFICATION_TYPE
}

export const createNotification = ({ state }: Context, notification: NotificationData) => {
    Store.addNotification({
        title: notification.title,
        message: notification.message,
        type: notification.type,
        insert: "top",
        container: "top-right",
        dismiss: {
            duration: 5000,
            pauseOnHover: true,
            showIcon: true
        }
    })
}