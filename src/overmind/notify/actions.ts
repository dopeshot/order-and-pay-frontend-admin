import { Store } from "react-notifications-component";
import { Context } from "..";
import { NotificationData } from "./type";

/**
 * Creates notification overlay
 */
export const createNotification = (context: Context, notification: NotificationData) => {

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