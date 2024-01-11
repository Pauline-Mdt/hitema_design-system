import {useEffect, useState} from "react";
import {deleteTattooistSocialNetwork, showSocialNetwork} from "../../services/lesGorgonesApi";
import {Link} from "react-router-dom";
import Button from "../Commons/Button";
import {Card, Col} from "react-bootstrap";


const TattooistSocialNetworkItem = ({tattooistSocialNetwork, tattooistSocialNetworks, setTattooistSocialNetworks}) => {
    const [socialNetwork, setSocialNetwork] = useState({});

    useEffect(() => {
        showSocialNetwork(tattooistSocialNetwork.social_network_id)
            .then(({data}) => {
                setSocialNetwork(data)
            })
            .catch(({response}) => {
                console.log(response)
                alert(response.data.message)
            })
    }, []);

    const deleteSelectedTattooistSocialNetwork = (id) => {
        deleteTattooistSocialNetwork(id)
            .then(() => {
                setTattooistSocialNetworks(tattooistSocialNetworks.filter(tattooistSocialNetwork => tattooistSocialNetwork.id !== id));
            })
            .catch(({response}) => {
                console.log(response.data)
                alert(response.data.message)
            })
    }

    return (
        <Col>
            <Card border="light" style={{ width: '10rem' }} className="mb-2">
                <Card.Img variant="top" src={socialNetwork.logo_url} alt={'Logo du réseau social '+ socialNetwork.name}  />
                <Card.Body>
                    <Card.Title>{socialNetwork.name}</Card.Title>
{/*
                    <Card.Link><Link to={`${tattooistSocialNetwork.id}`}>Modifier</Link></Card.Link>
                    <Card.Link><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedTattooistSocialNetwork(tattooistSocialNetwork.id)} /></Card.Link>
*/}
                    <Link to={`${tattooistSocialNetwork.id}`}>Modifier</Link>
                    <Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedTattooistSocialNetwork(tattooistSocialNetwork.id)} />
                </Card.Body>
            </Card>
        </Col>

        /*<Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>*/
        /*<li>
            <img src={socialNetwork.logo_url} alt={'Logo du réseau social '+ socialNetwork.name} height='32px'/>
            <p>{socialNetwork.name}</p>
            <div>
                <Link to={`${tattooistSocialNetwork.id}`}>Modifier</Link>
                <Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedTattooistSocialNetwork(tattooistSocialNetwork.id)} />
            </div>
        </li>*/
    );
}

export default TattooistSocialNetworkItem;