import useNavigateTo from "../../customHooks/useNatigateTo";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {listTattooistPictures, showAuthUserTattooist} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import TattooistPictureItem from "../../components/Items/TattooistPictureItem";
import {Row} from "react-bootstrap";

const TattooistPictures = ({isAdminView}) => {
    const {navigateToNew} = useNavigateTo();
    const {tattooistId} = useParams();

    const [tattooistPictures, setTattooistPictures] = useState([]);

    useEffect(() => {
        if (isAdminView) {
            listTattooistPictures(tattooistId, 0)
                .then(({data}) => {
                    setTattooistPictures(data)
                })
                .catch(({response}) => {
                    console.log(response)
                })
        } else {
            showAuthUserTattooist()
                .then(({data}) => {
                    listTattooistPictures(data.id, 0)
                        .then(({data}) => {
                            setTattooistPictures(data)
                        })
                        .catch(({response}) => {
                            console.log(response)
                        })
                })
                .catch(({response}) => {
                    console.log(response)
                })
        }
    }, []);

    return (
        <div>
            {
                isAdminView ? <h3>Liste de ses photos</h3> : <h3>Liste de mes photos</h3>
            }
            <Button buttonType='button' buttonText='Ajouter une photo' onButtonClick={navigateToNew} />
            <Row xs={2} md={4} lg={8} className="g-4">
                {
                    tattooistPictures.map((tattooistPicture) => (
                        <TattooistPictureItem key={tattooistPicture.id}
                                              tattooistPicture={tattooistPicture}
                                              tattooistPictures={tattooistPictures}
                                              setTattooistPictures={setTattooistPictures} />
                    ))
                }
            </Row>
        </div>
    );
}

export default TattooistPictures;