import { Link } from "react-router-dom"

export const Home: React.FunctionComponent = () => {
    return (
        <div>
            <h3 className="text-lg font-bold">Home</h3>
            <Link to="/tables">Hello</Link>
        </div>
    )
}