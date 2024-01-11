import {useLocation, useParams} from "react-router-dom";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {useEffect, useState} from "react";
import {createSubscriber, showSubscriber, updateSubscriber} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import InputField from "../../components/Commons/InputField";

const Subscriber = () => {
    const url = useLocation().pathname;
    const isNewSubscriber = url.includes('new');
    const {navigateBackToList} = useNavigateTo();
    const {subscriberId} = useParams();

    const [idInput, setIdInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    useEffect(() => {
        if (!isNewSubscriber) {
            showSubscriber(subscriberId)
                .then(({data}) => {
                    setIdInput(data.id)
                    setEmailInput(data.email)
                })
                .catch(({response}) =>{
                    console.log(response)
                })
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNewSubscriber) {
            createSubscriber(emailInput)
                .then(() => {
                    navigateBackToList()
                })
                .catch(({response}) => {
                    console.log(response.data)
                })
        } else {
            updateSubscriber(idInput, emailInput)
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
                isNewSubscriber ?
                    <h2>Ajouter un.e nouvel.le abonné.e</h2>
                    : <h2>Modifier l'abonné.e</h2>
            }
            <Button buttonType='button' buttonText='Retourner à la liste' onButtonClick={navigateBackToList} />
            <form onSubmit={handleSubmit}>
                <InputField
                    labelText='Email* : ' inputType='text' inputName='email' inputPlaceholder='email@exemple.com'
                    inputValue={emailInput} inputOnChange={(event) => setEmailInput(event.target.value)}
                    inputRequired={true} />
                <Button
                    buttonType='submit'
                    buttonText={isNewSubscriber? 'Ajouter': 'Enregistrer les modifications'} />
            </form>
        </div>
    );
}

export default Subscriber;