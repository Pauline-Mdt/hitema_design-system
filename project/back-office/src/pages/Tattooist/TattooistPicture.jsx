import {useLocation, useParams} from "react-router-dom";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {useEffect, useState} from "react";
import {createPicture, showAuthUserTattooist, showPicture, updatePicture} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import InputField from "../../components/Commons/InputField";
import CheckboxField from "../../components/Commons/CheckboxField";
import React from "react";

const TattooistPicture = ({isAdminView}) => {
    const url = useLocation().pathname;
    const isNewTattooistPicture = url.includes('pictures/new');
    const {navigateBackToList} = useNavigateTo();
    const {tattooistId, pictureId} = useParams();

    const fileInput = React.createRef();
    const [idInput, setIdInput] = useState(pictureId);
    const [tattooistIdInput, setTattooistIdInput] = useState(tattooistId);
    const [isVisibleInput, setIsVisibleInput] = useState(1);

    useEffect(() => {
        if (isAdminView) {
            if (!isNewTattooistPicture) {
                showPicture(pictureId)
                    .then(({data}) => {
                        setIdInput(data.id)
                        setTattooistIdInput(data.tattooist_id)
                        setIsVisibleInput(data.is_visible)
                    })
                    .catch(({response}) => {
                        console.log(response)
                    })
            }
        } else {
            showAuthUserTattooist()
                .then(({data}) => {
                    setTattooistIdInput(data.id)
                    if (!isNewTattooistPicture) {
                        showPicture(pictureId)
                            .then(({data}) => {
                                setIdInput(data.id)
                                setTattooistIdInput(data.tattooist_id)
                                setIsVisibleInput(data.is_visible)
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
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNewTattooistPicture) {
            console.log(fileInput.current.files[0], tattooistIdInput, 0, isVisibleInput)
            createPicture(fileInput.current.files[0], tattooistIdInput, 0, isVisibleInput)
                .then(() => {
                    navigateBackToList();
                })
                .catch(({response}) => {
                    console.log(response.data)
                    alert(response.data.message)
                })
        } else {
            updatePicture(idInput, fileInput.current.files[0], 0, isVisibleInput)
                .then(() => {
                    navigateBackToList();
                })
                .catch(({response}) => {
                    console.log(response.data)
                    alert(response.data.message)
                })
        }
    }

    return (
        <div>
            {
                isNewTattooistPicture ? <h3>Ajouter une photo</h3> : <h3>Modifier la photo</h3>
            }
            <Button buttonType='button' buttonText='Retourner à la liste' onButtonClick={navigateBackToList} />
            <form onSubmit={handleSubmit}>
                <InputField labelText='Choisir une image* : ' inputType='file' refInput={fileInput}
                            inputRequired={isNewTattooistPicture} />
                <CheckboxField
                    labelText='Photo visible sur le site' inputName='is_visible'
                    inputChecked={isVisibleInput} inputOnChange={(event) => setIsVisibleInput(event.target.checked? 1 : 0)}/>
                <Button buttonType='submit' buttonText={isNewTattooistPicture? 'Ajouter': 'Enregistrer les modifications'} />
            </form>
        </div>
    );
}

export default TattooistPicture