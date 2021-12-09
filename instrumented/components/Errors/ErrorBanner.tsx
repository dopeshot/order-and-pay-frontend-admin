import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export type ErrorBannerProps = {
    headlineContent: string,
    listContent: string[]
}

export const ErrorBanner: React.FunctionComponent<ErrorBannerProps> = (props) => {
    return (
        <div className="flex items-baseline bg-danger-red bg-opacity-10 rounded-lg my-4 py-4 px-6">
            <FontAwesomeIcon icon={faTimesCircle} className="text-danger-red mr-3" />
            <div>
                <h4 className="text-darker-danger-red font-semibold mb-1">{props.headlineContent}</h4>
                <ul className="list-disc text-dark-danger-red ml-10">
                    {props.listContent && props.listContent.map((li, index) => (<li key={index}>{li}</li>))}
                </ul>
            </div>
        </div>
    )
}