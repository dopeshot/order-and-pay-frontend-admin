import { useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "../../components/UI/Modal"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../../components/Buttons/Button"

export const Home: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div className="container mt-12">
            <h3 className="text-2xl font-bold">Welcome</h3>
            <Link to="/tables">Gehe zu Tabellen</Link>

            <Modal modalHeading="heelo" modalLabel="hshshsh" open={isOpen} setIsOpen={setIsOpen}>
                <p className="mb-2">jhej</p>
                <div className="flex justify-between">
                    <Button buttonType="primary" type="button" onClick={() => setIsOpen(true)}>Open</Button>
                    <Button buttonType="primary" type="button" onClick={() => setIsOpen(true)}>Open</Button>
                </div>
            </Modal>
            <Button onClick={() => setIsOpen(true)} className="text-darkgrey hover:text-darkgrey" icon={faChevronLeft}>Open</Button>
        </div>
    )
}