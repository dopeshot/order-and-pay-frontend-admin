import { Link } from "react-router-dom"
import { Tag, TagTypesEnum } from "../../components/UI/Tag"

export const Home: React.FunctionComponent = () => {
    return (
        <div className="container mt-12">
            <h3 className="text-2xl font-bold">Welcome</h3>
            <Link to="/tables">Gehe zu Tabellen</Link>

            <Tag title="test" type={TagTypesEnum.red} />
            <Tag title="test" type={TagTypesEnum.purple} />
            <Tag title="test" type={TagTypesEnum.pink} />
            <Tag title="test" type={TagTypesEnum.lightblue} />
            <Tag title="test" type={TagTypesEnum.blue} />
            <Tag title="test" type={TagTypesEnum.green} />
            <Tag title="test" type={TagTypesEnum.yellow} />
            <Tag title="test" type={TagTypesEnum.lightgrey} />
            <Tag title="test" type={TagTypesEnum.darkgrey} />
            <Tag title="test" type={TagTypesEnum.dark} />
        </div>
    )
}