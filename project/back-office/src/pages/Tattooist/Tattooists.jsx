import useNavigateTo from "../../customHooks/useNatigateTo";
import {useEffect, useState} from "react";
import {deleteTattooist, listTattooists} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

const Tattooists = () => {
    const {navigateToNew} = useNavigateTo();

    const [tattooists, setTattooists] = useState([]);

    useEffect(() => {
        listTattooists()
            .then(({data}) => {
                setTattooists(data)
            })
            .catch(({response}) => {
                console.log(response)
            })
    }, []);

    const deleteSelectedTattooist = (id) => {
        deleteTattooist(id)
            .then(() => {
                setTattooists(tattooists.filter(tattooist => tattooist.id !== id));
            })
            .catch(({response}) => {
                console.log(response.data)
            })
    };

    return (
        <div>
            <h2>Les profils de tatoueur.se.s</h2>
            <Button buttonType='button' buttonText='Ajouter un nouveau profil de tatoueur.se' onButtonClick={navigateToNew} />
            <h3>Guests</h3>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Nom d'artiste</th>
                    <th>Email</th>
                    <th>Profil actif</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {tattooists.map((tattooist) => (
                    tattooist.is_resident === 0 && (
                        <tr key={tattooist.id}>
                            <td>{tattooist.name}</td>
                            <td>{tattooist.email}</td>
                            <td>{tattooist.is_active ? 'Oui' : 'Non'}</td>
                            <td><Link to={`${tattooist.id}`}>Modifier</Link></td>
                            <td><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedTattooist(tattooist.id)} /></td>
                        </tr>
                    )
                ))}
                </tbody>
            </Table>

            <h3>Résident.e.s</h3>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Nom d'artiste</th>
                    <th>Email</th>
                    <th>Ce profil est actif</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {tattooists.map((tattooist) => (
                    tattooist.is_resident === 1 && (
                        <tr key={tattooist.id}>
                            <td>{tattooist.name}</td>
                            <td>{tattooist.email}</td>
                            <td>{tattooist.is_active ? 'Oui' : 'Non'}</td>
                            <td><Link to={`${tattooist.id}`}>Modifier</Link></td>
                            <td><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedTattooist(tattooist.id)} /></td>
                        </tr>
                    )
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Tattooists;