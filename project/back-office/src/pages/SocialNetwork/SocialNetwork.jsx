import {useLocation, useParams} from "react-router-dom";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {useState} from "react";
import {useEffect} from "react";
import {createSocialNetwork, showSocialNetwork, updateSocialNetwork} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import InputField from "../../components/Commons/InputField";

const SocialNetwork = () => {
    const url = useLocation().pathname;
    const isNewSocialNetwork = url.includes('new');
    const {navigateBackToList} = useNavigateTo();
    const {socialNetworkId} = useParams();

    const [idInput, setIdInput] = useState('');
    const [nameInput, setNameInput] = useState('');

    useEffect(() => {
        if (!isNewSocialNetwork) {
            showSocialNetwork(socialNetworkId)
                .then(({data}) => {
                    setIdInput(data.id)
                    setNameInput(data.name)
                })
                .catch(({response}) => {
                    console.log(response)
                })
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNewSocialNetwork) {
            createSocialNetwork(nameInput)
                .then(() => {
                    navigateBackToList()
                })
                .catch(({response}) => {
                    console.log(response.data)
                })
        } else {
            updateSocialNetwork(idInput, nameInput)
                .then(() => {
                    navigateBackToList()
                })
                .catch(({response}) => {
                    console.log(response.data)
                })
        }
    }

    return (
        <div>
            {
                isNewSocialNetwork ? <h2>Ajouter un nouveau réseau social</h2> : <h2>Modifier le réseau social</h2>
            }
            <Button buttonType='button' buttonText='Retourner à la liste' onButtonClick={navigateBackToList} />
            <form onSubmit={handleSubmit}>
                <InputField
                    labelText='Nom* : ' inputType='text' inputName='name' inputPlaceholder='Facebook, Instagram, ...'
                    inputValue={nameInput} inputOnChange={(event) => setNameInput(event.target.value)}
                    inputRequired={true} />
                <Button
                    buttonType='submit'
                    buttonText={isNewSocialNetwork? 'Ajouter': 'Enregistrer les modifications'} />
            </form>
        </div>
    );
}

export default SocialNetwork;