
type ButtonProps = {
    onClick: (values: any) => void,
    content: string
}

export const SecondaryButton: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    return (
        <button type="button" onClick={props.onClick} className="text-primary-blue hover:text-primary-blue-hover focus:text-primary-blue-hover font-semibold mt-2 py-2 sm:mt-0 sm:py-0">
            {props.content}
        </button>
    )
}