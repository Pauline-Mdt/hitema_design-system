import {useLocation, useParams} from "react-router-dom";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {useEffect, useState} from "react";
import {
    createTattooistSocialNetwork,
    listSocialNetworks,
    listTattooists,
    showAuthUserTattooist, showPicture,
    showTattooistSocialNetwork,
    updateTattooistSocialNetwork
} from "../../services/lesGorgonesApi";
import InputField from "../../components/Commons/InputField";
import ListField from "../../components/Commons/ListField";
import Button from "../../components/Commons/Button";

const TattooistSocialNetwork = ({isAdminView}) => {
    const url = useLocation().pathname;
    const isNewTattooistSocialNetwork = url.includes('social-networks/new');
    const {navigateBackToList} = useNavigateTo();
    const {tattooistId, tattooistSocialNetworkId} = useParams();

    const [tattooists, setTattooists] = useState([]);
    const [socialNetworks, setSocialNetworks] = useState([]);
    const [idInput, setIdInput] = useState(tattooistSocialNetworkId);
    const [tattooistIdInput, setTattooistIdInput] = useState(tattooistId);
    const [socialNetworkIdInput, setSocialNetworkIdInput] = useState('');
    const [urlInput, setUrlInput] = useState('');

    useEffect(() => {
        listTattooists()
            .then(({data}) => {
                setTattooists(data)
            })
            .catch(({response}) => {
                console.log(response)
            })

        listSocialNetworks()
            .then(({data}) => {
                setSocialNetworks(data)
            })
            .catch(({response}) => {
                console.log(response)
            })

        if (isAdminView) {
            if (!isNewTattooistSocialNetwork) {
                showTattooistSocialNetwork(tattooistSocialNetworkId)
                    .then(({data}) => {
                        setIdInput(data.id)
                        setTattooistIdInput(data.tattooist_id)
                        setSocialNetworkIdInput(data.social_network_id)
                        setUrlInput(data.url)
                    })
                    .catch(({response}) => {
                        console.log(response)
                    })
            }
        } else {
            showAuthUserTattooist()
                .then(({data}) => {
                    setTattooistIdInput(data.id)
                    if (!isNewTattooistSocialNetwork) {
                        showTattooistSocialNetwork(tattooistSocialNetworkId)
                            .then(({data}) => {
                                setIdInput(data.id)
                                setTattooistIdInput(data.tattooist_id)
                                setSocialNetworkIdInput(data.social_network_id)
                                setUrlInput(data.url)
                            })
                            .catch(({response}) => {
                                console.log(response)
                            })
                    }
                })
                .catch(({response}) => {
                    console.log(response)
                })
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNewTattooistSocialNetwork) {
            createTattooistSocialNetwork(tattooistIdInput, socialNetworkIdInput, urlInput)
                .then(() => {
                    navigateBackToList();
                })
                .catch(({response}) => {
                    console.log(response.data);
                })
        } else {
            updateTattooistSocialNetwork(idInput, tattooistIdInput, socialNetworkIdInput, urlInput)
                .then(() => {
                    navigateBackToList();
                })
                .catch(({response}) => {
                    console.log(response.data);
                })
        }
    }

    return (
        <div>
            {
                isNewTattooistSocialNetwork ? <h3>Ajouter un réseau social</h3> : <h3>Modifier le réseau social</h3>
            }
            <Button buttonType='button' buttonText='Retourner à la liste' onButtonClick={navigateBackToList} />
            <form onSubmit={handleSubmit}>
                <ListField
                    labelText='Sélectionner le/la tatoueur.se*' nameList='tattooist_id'
                    listValue={tattooistIdInput} listOnChange={(event) => setTattooistIdInput(event.target.value)}
                    choiceRequired={true} choiceDisabled={true}
                    optionsList={tattooists} />
                <ListField
                    labelText='Sélectionner le réseau social*' nameList='social_network_id'
                    listValue={socialNetworkIdInput} listOnChange={(event) => setSocialNetworkIdInput(event.target.value)}
                    choiceRequired={true} choiceDisabled={!isNewTattooistSocialNetwork}
                    optionsList={socialNetworks} />
                <InputField
                    labelText='Lien du réseau social* : ' inputType='url' inputName='url' inputPlaceholder='https://www.exemple.com/lien-du-compte'
                    inputValue={urlInput} inputOnChange={(event) => setUrlInput(event.target.value)}
                    inputRequired={true} />
                <Button buttonType='submit' buttonText={isNewTattooistSocialNetwork? 'Ajouter': 'Enregistrer les modifications'} />
            </form>
        </div>
    );
}

export default TattooistSocialNetwork;