import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {listTattooistSocialNetworks, showAuthUserTattooist} from "../../services/lesGorgonesApi";
import TattooistSocialNetworkItem from "../../components/Items/TattooistSocialNetworkItem";
import Button from "../../components/Commons/Button";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {Row} from "react-bootstrap";

const TattooistSocialNetworks = ({isAdminView}) => {
    const {navigateToNew} = useNavigateTo();
    const {tattooistId} = useParams();

    const [tattooistSocialNetworks, setTattooistSocialNetworks] = useState([]);

    useEffect(() => {
        if (isAdminView) {
            listTattooistSocialNetworks(tattooistId)
                .then(({data}) => {
                    setTattooistSocialNetworks(data)
                })
                .catch(({response}) => {
                    console.log(response)
                })
        } else {
            showAuthUserTattooist()
                .then(({data}) => {
                    listTattooistSocialNetworks(data.id)
                        .then(({data}) => {
                            setTattooistSocialNetworks(data)
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
                isAdminView ? <h3>Liste de ses réseaux sociaux</h3> : <h3>Liste de mes réseaux sociaux</h3>
            }
            <Button buttonType='button' buttonText='Ajouter un réseau social' onButtonClick={navigateToNew} />
            <Row xs={2} md={4} lg={8} className="g-4">
                {
                    tattooistSocialNetworks.map((tattooistSocialNetwork) => (
                        <TattooistSocialNetworkItem key={tattooistSocialNetwork.social_network_id}
                                                    tattooistSocialNetwork={tattooistSocialNetwork}
                                                    tattooistSocialNetworks={tattooistSocialNetworks}
                                                    setTattooistSocialNetworks={setTattooistSocialNetworks} />
                    ))
                }
            </Row>
        </div>
    );
}

export default TattooistSocialNetworks;