import { NotificationTitleMessage, NOTIFICATION_TYPE } from "react-notifications-component";

export type NotificationData = {
    /** Title of notification message */
    title: NotificationTitleMessage
    /** Message of notification */
    message: NotificationTitleMessage
    /** Type of notification for example warning */
    type: NOTIFICATION_TYPE
}
