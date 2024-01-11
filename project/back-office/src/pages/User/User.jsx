import InputField from "../../components/Commons/InputField";
import {useEffect, useState} from "react";
import ListField from "../../components/Commons/ListField";
import {createUser, listTattooists, showAuthUser, showUser, updateUser} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import {useLocation, useParams} from "react-router-dom";
import CheckboxField from "../../components/Commons/CheckboxField";
import useNavigateTo from "../../customHooks/useNatigateTo";

const User = () => {
    const url = useLocation().pathname;
    const isAdminView = url.includes('admin');
    const isNewUser = url.includes('new');
    const {navigateBackToList} = useNavigateTo();
    const {userId} = useParams();

    const [tattooists, setTattooists] = useState([]);
    const [idInput, setIdInput] = useState('');
    const [tattooistIdInput, setTattooistIdInput] = useState('');
    const [isAdminInput, setIsAdminInput] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    useEffect(() => {
        listTattooists()
            .then(({data}) => {
                setTattooists(data)
            })
            .catch(({response}) => {
                console.log(response)
            })

        if (isAdminView) {
            if (!isNewUser) {
                showUser(userId)
                    .then(({data}) => {
                        setIdInput(data.id)
                        setTattooistIdInput(data.tattooist_id)
                        setIsAdminInput(data.is_admin)
                        setFirstNameInput(data.first_name)
                        setLastNameInput(data.last_name)
                        setEmailInput(data.email)
                    })
                    .catch(({response}) => {
                        console.log(response)
                    })
            }
        } else {
            showAuthUser()
                .then(({data}) => {
                    setIdInput(data.id)
                    setTattooistIdInput(data.tattooist_id)
                    setIsAdminInput(data.is_admin)
                    setFirstNameInput(data.first_name)
                    setLastNameInput(data.last_name)
                    setEmailInput(data.email)
                })
                .catch(({response}) => {
                    console.log(response)
                })
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNewUser) {
            createUser(tattooistIdInput, isAdminInput, firstNameInput, lastNameInput, emailInput)
                .then(() => {
                    isAdminView? navigateBackToList(): window.location.reload();
                })
                .catch(({response}) => {
                    console.log(response.data)
                    alert(response.data.message)
                })
        } else {
            updateUser(idInput, tattooistIdInput, isAdminInput, firstNameInput, lastNameInput, emailInput)
                .then(() => {
                    isAdminView? navigateBackToList(): window.location.reload();
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
                isAdminView ?
                    <h2>{isNewUser? 'Ajouter un nouveau compte utilisateur': `Compte utilisateur de ${firstNameInput} ${lastNameInput}`}</h2>
                    : <h2>Mon compte utilisateur</h2>
            }
            {
                isAdminView && (
                    <Button buttonType='button' buttonText='Retourner à la liste' onButtonClick={navigateBackToList} />
                )
            }
            <form onSubmit={handleSubmit}>
                <InputField
                    labelText='Prénom* : ' inputType='text' inputName='first_name' inputPlaceholder='Prénom'
                    inputValue={firstNameInput} inputOnChange={(event) => setFirstNameInput(event.target.value)}
                    inputRequired={true} />
                <InputField
                    labelText='Nom* : ' inputType='text' inputName='last_name' inputPlaceholder='Nom'
                    inputValue={lastNameInput} inputOnChange={(event) => setLastNameInput(event.target.value)}
                    inputRequired={true} />
                <InputField
                    labelText='Email de connexion* : ' inputType='email' inputName='email' inputPlaceholder='email@exemple.com'
                    inputValue={emailInput} inputOnChange={(event) => setEmailInput(event.target.value)}
                    inputRequired={true} />
                {
                    isAdminView &&
                    <>
                        <ListField
                            labelText='Sélectionner un profil tatoueur.se associé' nameList='tattooist_id'
                            listValue={tattooistIdInput} listOnChange={(event) => setTattooistIdInput(event.target.value)}
                            optionsList={tattooists} />
                        <CheckboxField
                            labelText='Administrateur' inputName='is_admin'
                            inputChecked={isAdminInput} inputOnChange={(event) => setIsAdminInput(event.target.checked)} />
                    </>
                }
                <Button buttonType='submit' buttonText={isNewUser? 'Ajouter': 'Enregistrer les modifications'} />
            </form>
        </div>
    );
}

export default User;