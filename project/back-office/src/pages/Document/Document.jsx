import {useLocation, useParams} from "react-router-dom";
import useNavigateTo from "../../customHooks/useNatigateTo";
import React, {useState, useEffect} from "react";
import {createDocument, listDocumentCategories, listUsers, showAuthUser, showDocument, showDocumentCategory, updateDocument,} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import ListField from "../../components/Commons/ListField";
import InputField from "../../components/Commons/InputField";

const Document = () => {
    const url = useLocation().pathname;
    const isAdminView = url.includes('admin');
    const isNewDocument = url.includes('new');
    const {navigateBackToList} = useNavigateTo();
    const {documentId} = useParams();
    const documentCategoryInput = React.createRef();

    const [documentCategories, setDocumentCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [isPrivateDocumentCategory, setIsPrivateDocumentCategory] = useState(false);
    const fileInput = React.createRef();
    const [idInput, setIdInput] = useState(documentId);
    const [documentCategoryIdInput, setDocumentCategoryIdInput] = useState('');
    const [userIdInput, setUserIdInput] = useState('');
    const [titleInput, setTitleInput] = useState('');

    useEffect(() => {
        listDocumentCategories()
            .then(({data}) => {
                setDocumentCategories(data)
            })
            .catch(({response}) => {
                console.log(response)
                alert(response.data.message)
            })

        listUsers()
            .then(({data}) => {
                setUsers(data)
            })
            .catch(({response}) => {
                console.log(response)
                alert(response.data.message)
            })

        if (isAdminView) {
            if (!isNewDocument) {
                showDocument(documentId)
                    .then(({data}) => {
                        setIdInput(data.id)
                        setDocumentCategoryIdInput(data.document_category_id)
                        setUserIdInput(data.user_id)
                        setTitleInput(data.title)
                        showDocumentCategory(data.document_category_id)
                            .then(({data}) => {
                                setIsPrivateDocumentCategory(data.is_private)
                            })
                            .catch(({response}) => {
                                console.log(response)
                                alert(response.data.message)
                            })
                    })
                    .catch(({response}) => {
                        console.log(response)
                        alert(response.data.message)
                    })
            }
        } else {
            showAuthUser()
                .then(({data}) => {
                    setUserIdInput(data.id)
                    if (!isNewDocument) {
                        showDocument(documentId)
                            .then(({data}) => {
                                setIdInput(data.id)
                                setDocumentCategoryIdInput(data.document_category_id)
                                setUserIdInput(data.user_id)
                                setTitleInput(data.title)
                                showDocumentCategory(data.document_category_id)
                                    .then(({data}) => {
                                        setIsPrivateDocumentCategory(data.is_private)
                                    })
                                    .catch(({response}) => {
                                        console.log(response)
                                        alert(response.data.message)
                                    })
                            })
                            .catch(({response}) => {
                                console.log(response)
                                alert(response.data.message)
                            })
                    }
                })
                .catch(({response}) => {
                    console.log(response)
                    alert(response.data.message)
                })
        }
    }, []);
    
    const getDocumentCategoryFromSelect = (documentCategoryId) => {
        documentCategoryId?
        showDocumentCategory(documentCategoryId)
            .then(({data}) => {
                setIsPrivateDocumentCategory(data.is_private)
            })
            .catch(({response}) => {
                console.log(response)
                alert(response.data.message)
            })
            : setIsPrivateDocumentCategory(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNewDocument) {
            createDocument(fileInput.current.files[0], documentCategoryIdInput, userIdInput, titleInput)
                .then(() => {
                    navigateBackToList();
                })
                .catch(({response}) => {
                    console.log(response.data)
                    alert(response.data.message)
                })
        } else {
            updateDocument(idInput, fileInput.current.files[0], documentCategoryIdInput, userIdInput, titleInput)
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
                isNewDocument ? <h3>Ajouter un document</h3> : <h3>Modifier le document</h3>
            }
            <Button buttonType='button' buttonText='Retourner à la liste' onButtonClick={navigateBackToList} />
            <form onSubmit={handleSubmit}>
                <InputField labelText='Choisir un fichier* : ' inputType='file' refInput={fileInput}
                            inputRequired={isNewDocument} />
                <ListField
                    labelText='Sélectionner la catégorie du document*' nameList='document_category_id'
                    refList={documentCategoryInput}
                    listValue={documentCategoryIdInput} listOnChange={(event) => {
                    setDocumentCategoryIdInput(event.target.value)
                    getDocumentCategoryFromSelect(event.target.value)
                }}
                    choiceRequired={true}
                    optionsList={documentCategories} />
                {
                    isPrivateDocumentCategory === 1? (
                        <ListField
                            labelText="Sélectionner l'utilisateur*" nameList='user_id'
                            listValue={userIdInput} listOnChange={(event) => setUserIdInput(event.target.value)}
                            choiceRequired={true}
                            // choiceDisabled={!isNewDocument}
                            optionsList={users} />
                    ): null
                }
                <InputField
                    labelText='Titre du document* : ' inputType='text' inputName='title' inputPlaceholder="Contrat de quelqu'un du XX/XX/XXXX"
                    inputValue={titleInput} inputOnChange={(event) => setTitleInput(event.target.value)}
                    inputRequired={true} />
                <Button buttonType='submit' buttonText={isNewDocument? 'Ajouter': 'Enregistrer les modifications'} />
            </form>
        </div>
    );
}

export default Document;