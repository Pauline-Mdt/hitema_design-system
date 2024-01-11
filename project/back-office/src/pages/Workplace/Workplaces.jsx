import useNavigateTo from "../../customHooks/useNatigateTo";
import {useEffect, useState} from "react";
import {deleteWorkplace, listWorkplaces} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

const Workplaces = () => {
    const {navigateToNew} = useNavigateTo();
    const [workplaces, setWorkplaces] = useState([]);

    useEffect(() => {
        listWorkplaces()
            .then(({data}) => {
                setWorkplaces(data)
            })
            .catch(({response}) => {
                console.log(response)
            })
    }, []);

    const deleteSelectedWorkplace = (id) => {
        deleteWorkplace(id)
            .then(() => {
                setWorkplaces(workplaces.filter(workplace => workplace.id !== id));
            })
            .catch(({response}) => {
                console.log(response.data)
            })
    }

    return (
        <div>
            <h2>Les postes de travail</h2>
            <Button buttonType='button' buttonText='Ajouter un nouveau poste de travail' onButtonClick={navigateToNew} />
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>N° du poste</th>
                    <th>Ce poste de travail est accessible PMR</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {workplaces.map((workplace) => (
                    <tr key={workplace.id}>
                        <td>{workplace.number}</td>
                        <td>{workplace.is_pmr ? 'Oui' : 'Non'}</td>
                        <td><Link to={`${workplace.id}`}>Modifier</Link></td>
                        <td><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedWorkplace(workplace.id)} /></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Workplaces;