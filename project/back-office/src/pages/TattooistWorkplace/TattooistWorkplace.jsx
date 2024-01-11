import {useLocation, useParams} from "react-router-dom";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {useEffect, useState} from "react";
import {
    createTattooistWorkplace, deleteDocumentCategory, deleteTattooistWorkplace,
    listTattooists, listWorkplaces,
    showTattooistSocialNetwork, showTattooistWorkplace, updateTattooistWorkplace
} from "../../services/lesGorgonesApi";
import Button from "../../components/Commons/Button";
import ListField from "../../components/Commons/ListField";
import InputField from "../../components/Commons/InputField";

const TattooistWorkplace = () => {
    const url = useLocation().pathname;
    const isNewTattooistWorkplace = url.includes('new');
    const {navigateBackToList} = useNavigateTo();
    const {tattooistWorkplaceId} = useParams();

    const [workplaces, setWorkplaces] = useState([]);
    const [tattooists, setTattooists] = useState([]);
    const [idInput, setIdInput] = useState(tattooistWorkplaceId);
    const [workplaceIdInput, setWorkplaceIdInput] = useState('');
    const [tattooistIdInput, setTattooistIdInput] = useState('');
    const [startDateInput, setStartDateInput] = useState('');
    const [endDateInput, setEndDateInput] = useState('');

    useEffect(() => {
        listWorkplaces()
            .then(({data}) => {
                setWorkplaces(data)
            })
            .catch(({response}) => {
                console.log(response)
            })

        listTattooists()
            .then(({data}) => {
                setTattooists(data)
            })
            .catch(({response}) => {
                console.log(response)
            })

        if (!isNewTattooistWorkplace) {
            showTattooistWorkplace(tattooistWorkplaceId)
                .then(({data}) => {
                    console.log(data)
                    setIdInput(data.id)
                    setWorkplaceIdInput(data.workplace_id)
                    setTattooistIdInput(data.tattooist_id)
                    setStartDateInput(data.start_date)
                    setEndDateInput(data.end_date)
                })
                .catch(({response}) => {
                    console.log(response)
                })
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNewTattooistWorkplace) {
            createTattooistWorkplace(workplaceIdInput, tattooistIdInput, startDateInput, endDateInput)
                .then(() => {
                    navigateBackToList();
                })
                .catch(({response}) => {
                    console.log(response.data);
                })
        } else {
            updateTattooistWorkplace(idInput, workplaceIdInput, tattooistIdInput, startDateInput, endDateInput)
                .then(() => {
                    navigateBackToList();
                })
                .catch(({response}) => {
                    console.log(response.data);
                })
        }
    }

    const deleteSelectedTattooistWorkplace = (id) => {
        deleteTattooistWorkplace(id)
            .then(({data}) => {
                console.log(data)
                navigateBackToList();
            })
            .catch(({response}) => {
                console.log(response.data)
            })
    }

    return (
        <div>
            {
                isNewTattooistWorkplace ? <h3>Ajouter une présence</h3> : <h3>Modifier la présence</h3>
            }
            <Button buttonType='button' buttonText='Retourner à la liste' onButtonClick={navigateBackToList} />
            <form onSubmit={handleSubmit}>
                <ListField
                    labelText='Sélectionner le poste de travail*' nameList='workplace_id'
                    listValue={workplaceIdInput} listOnChange={(event) => setWorkplaceIdInput(event.target.value)}
                    choiceRequired={true}
                    optionsList={workplaces} />
                <ListField
                    labelText='Sélectionner le/la tatoueur.se*' nameList='tattooist_id'
                    listValue={tattooistIdInput} listOnChange={(event) => setTattooistIdInput(event.target.value)}
                    choiceRequired={true}
                    optionsList={tattooists} />
                <InputField
                    labelText='Date de début* : ' inputType='date' inputName='start_date'
                    inputValue={startDateInput} inputOnChange={(event) => setStartDateInput(event.target.value)}
                    inputRequired={true} />
                <InputField
                    labelText='Date de fin* : ' inputType='date' inputName='end_date'
                    inputValue={endDateInput} inputOnChange={(event) => setEndDateInput(event.target.value)}
                    inputRequired={true} />
                <Button buttonType='submit' buttonText={isNewTattooistWorkplace? 'Ajouter': 'Enregistrer les modifications'} />
            </form>
            {
                !isNewTattooistWorkplace && (
                    <Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedTattooistWorkplace(idInput)} />
                )
            }
        </div>
    );
}

export default TattooistWorkplace;