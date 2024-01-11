import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createDocumentCategory, showDocumentCategory, updateDocumentCategory} from "../../services/lesGorgonesApi";
import InputField from "../../components/Commons/InputField";
import CheckboxField from "../../components/Commons/CheckboxField";
import Button from "../../components/Commons/Button";
import useNavigateTo from "../../customHooks/useNatigateTo";

const DocumentCategory = () => {
    const url = useLocation().pathname;
    const isNewDocumentCategory = url.includes('new');
    const {navigateBackToList} = useNavigateTo();
    const {documentCategoryId} = useParams();

    const [idInput, setIdInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [isPrivateInput, setIsPrivateInput] = useState(true);

    useEffect(() => {
        if (!isNewDocumentCategory) {
            showDocumentCategory(documentCategoryId)
                .then(({data}) => {
                    setIdInput(data.id)
                    setNameInput(data.name)
                    setIsPrivateInput(data.is_private)
                })
                .catch(({response}) => {
                    console.log(response)
                })
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNewDocumentCategory) {
            createDocumentCategory(nameInput, isPrivateInput)
                .then(() => {
                    navigateBackToList()
                })
                .catch(({response}) => {
                    console.log(response.data)
                })
        } else {
            updateDocumentCategory(idInput, nameInput, isPrivateInput)
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
                isNewDocumentCategory ?
                    <h2>Ajouter une nouvelle catégorie de document</h2>
                    : <h2>Modifier la catégorie</h2>
            }
            <Button buttonType='button' buttonText='Retourner à la liste' onButtonClick={navigateBackToList} />
            <form onSubmit={handleSubmit}>
                <InputField
                    labelText='Nom* : ' inputType='text' inputName='name' inputPlaceholder='Contrat, Décharge, Facture, ...'
                    inputValue={nameInput} inputOnChange={(event) => setNameInput(event.target.value)}
                    inputRequired={true} />
                <CheckboxField
                    labelText='Cette catégorie de document est privée' inputName='is_private'
                    inputChecked={isPrivateInput} inputOnChange={(event) => setIsPrivateInput(!isPrivateInput)} />
                <Button
                    buttonType='submit'
                buttonText={isNewDocumentCategory? 'Ajouter': 'Enregistrer les modifications'} />
            </form>
        </div>
    );
}

export default DocumentCategory;