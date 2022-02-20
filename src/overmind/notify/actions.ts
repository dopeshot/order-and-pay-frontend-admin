import { NotificationTitleMessage, NOTIFICATION_TYPE, Store } from "react-notifications-component";
import { Context } from "..";

export type NotificationData = {
    /** Title of notification message */
    title: NotificationTitleMessage
    /** Message of notification */
    message: NotificationTitleMessage
    /** Type of notification for example warning */
    type: NOTIFICATION_TYPE
}

/**
 * Creates notification overlay
 */
export const createNotification = ({ state }: Context, notification: NotificationData) => {

    // We use this lib to create notifications (will replace with own code later).
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