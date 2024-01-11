import {deleteDocument, listAuthUserDocuments, listDocuments} from "../../services/lesGorgonesApi";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Button from "../../components/Commons/Button";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {Tab, Table} from "react-bootstrap";

const Documents = () => {
    const url = useLocation().pathname;
    const isAdminView = url.includes('admin');
    const {navigateToNew} = useNavigateTo();

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (isAdminView) {
            listDocuments()
                .then(({data}) => {
                    setDocuments(data)
                })
                .catch(({response}) => {
                    console.log(response)
                    alert(response.data.message)
                })
        } else {
            listAuthUserDocuments()
                .then(({data}) => {
                    setDocuments(data)
                })
                .catch(({response}) => {
                    console.log(response)
                    alert(response.data.message)
                })
        }
    }, []);

    const deleteSelectedDocument = (id) => {
        deleteDocument(id)
            .then(() => {
                setDocuments(documents.filter(document => document.id !== id));
            })
            .catch(({response}) => {
                console.log(response.data)
                alert(response.data.message)
            })
    }

    return (
        <div>
            {
                isAdminView ?
                    <h2>Les documents</h2>
                    : <h2>Mes documents</h2>
            }
            {
                isAdminView && (
                    <Button buttonType='button' buttonText='Ajouter un nouveau document' onButtonClick={navigateToNew} />
                )
            }
            <h3>Documents communs</h3>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Catégorie</th>
                    <th>Nom</th>
                    {
                        isAdminView && (
                            <th colSpan="2">Actions</th>
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {documents.map((document) => (
                    !document.user_id && (
                        <tr key={document.id}>
                            <td>{document.document_category_name}</td>
                            <td><a href={document.url} target="_blank">{document.title}{document.extension}</a></td>
                            {
                                isAdminView && (
                                    <>
                                        <td><Link to={`${document.id}`}>Modifier</Link></td>
                                        <td><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedDocument(document.id)} /></td>
                                    </>
                                )
                            }
                        </tr>
                    )
                ))}
                </tbody>
            </Table>

            <h3>Documents personnels</h3>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Catégorie</th>
                    <th>Nom</th>
                    {
                        isAdminView && (
                            <th colSpan="2">Actions</th>
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {documents.map((document) => (
                    document.user_id && (
                        <tr key={document.id}>
                            <td>{document.document_category_name}</td>
                            <td><a href={document.url} target="_blank">{document.title}{document.extension}</a></td>
                            {
                                isAdminView && (
                                    <>
                                        <td><Link to={`${document.id}`}>Modifier</Link></td>
                                        <td><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedDocument(document.id)} /></td>
                                    </>
                                )
                            }
                        </tr>
                    )
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Documents;