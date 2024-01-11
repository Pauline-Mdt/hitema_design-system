import useNavigateTo from "../../customHooks/useNatigateTo";
import {useEffect, useState} from "react";
import {deleteSocialNetwork, listSocialNetworks} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

const SocialNetworks = () => {
    const {navigateToNew} = useNavigateTo();

    const [socialNetworks, setSocialNetworks] = useState([]);

    useEffect(() => {
        listSocialNetworks()
            .then(({data}) => {
                setSocialNetworks(data)
            })
            .catch(({response}) => {
                console.log(response)
            })
    }, []);

    const deleteSelectedSocialNetwork = (id) => {
        deleteSocialNetwork(id)
            .then(() => {
                setSocialNetworks(socialNetworks.filter(socialNetwork => socialNetwork.id !== id));
            })
            .catch(({response}) => {
                console.log(response.data)
            })
    }

    return (
        <div>
            <h2>Les réseaux sociaux</h2>
            <Button buttonType='button' buttonText='Ajouter un nouveau réseau social' onButtonClick={navigateToNew} />
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Logo</th>
                    <th>Nom</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {socialNetworks.map((socialNetwork) => (
                    <tr key={socialNetwork.id}>
                        <td><img src={socialNetwork.logo_url} alt={'Logo de '+socialNetwork.name} height='32px'/></td>
                        <td>{socialNetwork.name}</td>
                        <td><Link to={`${socialNetwork.id}`}>Modifier</Link></td>
                        <td><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedSocialNetwork(socialNetwork.id)} /></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default SocialNetworks;