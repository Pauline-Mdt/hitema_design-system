import {useEffect, useState} from "react";
import {deleteDocumentCategory, listDocumentCategories} from "../../services/lesGorgonesApi";
import {Link} from "react-router-dom";
import Button from "../../components/Commons/Button";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {Table} from "react-bootstrap";

const DocumentCategories = () => {
    const {navigateToNew} = useNavigateTo();

    const [documentCategories, setDocumentCategories] = useState([]);

    useEffect(() => {
        listDocumentCategories()
            .then(({data}) => {
                setDocumentCategories(data)
                console.log(data)
            })
            .catch(({response}) => {
                console.log(response)
                alert(response.data.message)
            })
    }, []);

    const deleteSelectedDocumentCategory = (id) => {
        deleteDocumentCategory(id)
            .then(() => {
                setDocumentCategories(documentCategories.filter(documentCategory => documentCategory.id !== id));
            })
            .catch(({response}) => {
                console.log(response.data)
            })
    }

    return (
        <div>
            <h2>Les catégories de document</h2>
            <Button buttonType='button' buttonText='Ajouter une nouvelle catégorie de document' onButtonClick={navigateToNew} />
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Cette catégorie de document est privée</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {documentCategories.map((documentCategory) => (
                    <tr key={documentCategory.id}>
                        <td>{documentCategory.name}</td>
                        <td>{
                            documentCategory.is_private ? 'Oui' : 'Non'
                        }</td>
                        <td><Link to={`${documentCategory.id}`}>Modifier</Link></td>
                        <td><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedDocumentCategory(documentCategory.id)} /></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default DocumentCategories;