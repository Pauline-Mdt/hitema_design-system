import React, {useEffect, useState} from "react";
import {
    createPicture,
    createTattooist, listTattooistPictures,
    showAuthUserTattooist, showPicture,
    showTattooist, updatePicture,
    updateTattooist
} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import InputField from "../../components/Commons/InputField";
import CheckboxField from "../../components/Commons/CheckboxField";
import useNavigateTo from "../../customHooks/useNatigateTo";
import TextareaField from "../../components/Commons/TextareaField";
import {useParams} from "react-router-dom";
import inputField from "../../components/Commons/InputField";

const TattooistInformation = ({isAdminView, isNewTattooist}) => {
    const {navigateBackToPrevious, navigateToNewId} = useNavigateTo();
    const {tattooistId} = useParams();

    const [tattooistIdInput, setTattooistIdInput] = useState('');
    const [isResidentInput, setIsResidentInput] = useState(false);
    const [isActiveInput, setIsActiveInput] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');

    const fileInput = React.createRef();
    const [pictureIdInput, setPictureIdInput] = useState('');
    const [url, setUrl] =useState('');

    useEffect(() => {
        if (isAdminView) {
            if (!isNewTattooist) {
                showTattooist(tattooistId)
                    .then(({data}) => {
                        setTattooistIdInput(data.id)
                        setIsResidentInput(data.is_resident)
                        setIsActiveInput(data.is_active)
                        setNameInput(data.name)
                        setEmailInput(data.email)
                        if (data.description) setDescriptionInput(data.description)
                    })
                    .catch(({response}) => {
                        console.log(response)
                    })
                listTattooistPictures(tattooistId, 1)
                    .then(({data}) => {
                        setPictureIdInput(data[0].id)
                        setUrl(data[0].url)
                    })
                    .catch(({response}) => {
                        console.log(response)
                    })
            }
        } else {
            showAuthUserTattooist()
                .then(({data}) => {
                    setTattooistIdInput(data.id)
                    setIsResidentInput(data.is_resident)
                    setIsActiveInput(data.is_active)
                    setNameInput(data.name)
                    setEmailInput(data.email)
                    if (data.description) setDescriptionInput(data.description)
                    listTattooistPictures(data.id, 1)
                        .then(({data}) => {
                            setPictureIdInput(data[0].id)
                            setUrl(data[0].url)
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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNewTattooist) {
            createTattooist(isResidentInput, isActiveInput, nameInput, emailInput, descriptionInput)
                .then(({data}) => {
                    createPicture(fileInput.current.files[0], data.id, 1, 1)
                        .then(({data}) => {
                            isAdminView? navigateToNewId(data.id): window.location.reload();
                        })
                        .catch((response) => {
                            console.log(response)
                        })
                })
                .catch(({response}) => {
                    console.log(response.data)
                })

        } else {
            updateTattooist(tattooistIdInput, isResidentInput, isActiveInput, nameInput, emailInput, descriptionInput)
                .then(({data}) => {
                    console.log(data)
                })
                .catch(({response}) => {
                    console.log(response.data)
                    alert(response.data.message)
                })
            if (fileInput.current.files.length){
                updatePicture(pictureIdInput, fileInput.current.files[0], 1, 1)
                    .then(() => {
                        // isAdminView? navigateBackToPrevious():
                        window.location.reload();
                    })
                    .catch(({response}) => {
                        console.log(response.data);
                    })
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <img src={url} alt={'Photo de profil de '+ nameInput} height='256px'/>
                {/*<label>*/}
                {/*    Choisir une image* :*/}
                {/*    <input type='file' ref={fileInput} name='picture' />*/}
                {/*</label>*/}
                <InputField labelText='Choisir une image* : ' inputType='file' refInput={fileInput}
                inputRequired={isNewTattooist} />
                <InputField
                    labelText="Nom d'artiste* : " inputType='text' inputName='name' inputPlaceholder="Nom d'artiste du tatoueur"
                    inputValue={nameInput} inputOnChange={(event) => setNameInput(event.target.value)}
                    inputRequired={true} />
                <InputField
                    labelText='Email de contact public* : ' inputType='email' inputName='email' inputPlaceholder='email@exemple.com'
                    inputValue={emailInput} inputOnChange={(event) => setEmailInput(event.target.value)}
                    inputRequired={true} />
                <TextareaField
                    labelText='Description : ' inputName='description' inputPlaceholder='Présentation, parcours, style(s) pratiqué(s), autre particularité ou juste un petit mot pour le visiteur'
                    inputValue={descriptionInput} inputOnChange={(event) => setDescriptionInput(event.target.value)} />
                <CheckboxField
                    labelText='Résident.e' inputName='is_resident'
                    inputChecked={isResidentInput} inputOnChange={(event) => setIsResidentInput(event.target.checked)}
                    inputDisabled={!isAdminView} />
                {
                    isAdminView &&
                    <CheckboxField
                        labelText='Profil actif (visible sur le site)' inputName='is_active'
                        inputChecked={isActiveInput} inputOnChange={(event) => setIsActiveInput(event.target.checked)}/>
                }
                <Button buttonType='submit' buttonText={isNewTattooist? 'Ajouter': 'Enregistrer les modifications'} />
            </form>
        </div>
    );
}

export default TattooistInformation;