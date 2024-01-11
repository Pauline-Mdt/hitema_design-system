import {Link} from "react-router-dom";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {useEffect, useState} from "react";
import {deleteSubscriber, listSubscribers} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import {Table} from "react-bootstrap";

const Subscribers = () => {
    const {navigateToNew} = useNavigateTo();

    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        listSubscribers()
            .then(({data}) => {
                setSubscribers(data)
            })
            .catch(({response}) => {
                console.log(response)
            })
    }, []);

    const deleteSelectedDocument = (id) => {
        deleteSubscriber(id)
            .then(() => {
                setSubscribers(subscribers.filter(subscriber => subscriber.id !== id));
            })
            .catch(({response}) => {
                console.log(response.data)
            })
    }

    return (
        <div>
            <h2>Les abonné.e.s</h2>
            <Button buttonType='button' buttonText='Ajouter un.e nouvel.le abonné.e' onButtonClick={navigateToNew} />
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Date d'inscription</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {subscribers.map((subscriber) => (
                    <tr key={subscriber.id}>
                        <td>{subscriber.email}</td>
                        <td>{subscriber.registration_date}</td>
                        <td><Link to={`${subscriber.id}`}>Modifier</Link></td>
                        <td><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedDocument(subscriber.id)} /></td>
                    </tr>
                    )
                )}
                </tbody>
            </Table>
        </div>
    );
}

export default Subscribers;