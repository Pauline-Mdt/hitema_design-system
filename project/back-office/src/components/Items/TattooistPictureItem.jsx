import {deletePicture} from "../../services/lesGorgonesApi";
import {Link} from "react-router-dom";
import Button from "../Commons/Button";
import {Card, Col} from "react-bootstrap";


const TattooistPictureItem = ({tattooistPicture, tattooistPictures, setTattooistPictures}) => {
    const deleteSelectedTattooistPicture = (id) => {
        deletePicture(id)
            .then(() => {
                setTattooistPictures(tattooistPictures.filter(tattooistPicture => tattooistPicture.id !== id));
            })
            .catch(({response}) => {
                console.log(response.data)
                alert(response.data.message)
            })
    }

    return (
        <Col>
            <Card border="light" style={{ width: '15rem' }} className="mb-2">
                <Card.Img variant="top" src={tattooistPicture.url} alt={'Photo n°'+ tattooistPicture.id}  />
                <Card.Body>
                    {/*
                    <Card.Link><Link to={`${tattooistSocialNetwork.id}`}>Modifier</Link></Card.Link>
                    <Card.Link><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedTattooistSocialNetwork(tattooistSocialNetwork.id)} /></Card.Link>
*/}
                    <Link to={`${tattooistPicture.id}`}>Modifier</Link>
                    <Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedTattooistPicture(tattooistPicture.id)} />
                </Card.Body>
            </Card>
        </Col>
        /*<li>
            <img src={tattooistPicture.url} alt={'Photo n°'+ tattooistPicture.id} height='256px'/>
            <div>
                <Link to={`${tattooistPicture.id}`}>Modifier</Link>
                <Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedTattooistPicture(tattooistPicture.id)} />
            </div>
        </li>*/
    );
}

export default TattooistPictureItem;