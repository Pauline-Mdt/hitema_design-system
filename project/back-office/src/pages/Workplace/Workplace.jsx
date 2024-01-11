import {useLocation, useParams} from "react-router-dom";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {useEffect, useState} from "react";
import {createWorkplace, showWorkplace, updateWorkplace} from "../../services/lesGorgonesApi";
import InputField from "../../components/Commons/InputField";
import CheckboxField from "../../components/Commons/CheckboxField";
import Button from "../../components/Commons/Button";

const Workplace = () => {
    const url = useLocation().pathname;
    const isNewWorkplace = url.includes('new');
    const {navigateBackToPrevious, navigateBackToList} = useNavigateTo();
    const {workplaceId} = useParams();

    const [workplaceIdInput, setWorkplaceIdInput] = useState('');
    const [numberInput, setNumberInput] = useState('');
    const [isPmrInput, setIsPmrInput] = useState(false);

    useEffect(() => {
        if (!isNewWorkplace) {
            showWorkplace(workplaceId)
                .then(({data}) => {
                    setWorkplaceIdInput(data.id)
                    setNumberInput(data.number)
                    setIsPmrInput(data.is_pmr)
                })
                .catch(({response}) => {
                    console.log(response)
                })
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNewWorkplace) {
            createWorkplace(numberInput, isPmrInput)
                .then(() => {
                    navigateBackToList()
                })
                .catch(({response}) => {
                    console.log(response.data)
                })
        } else {
            updateWorkplace(workplaceIdInput, numberInput, isPmrInput)
                .then(({data}) => {
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
                isNewWorkplace ? <h2>Ajouter un nouveau poste de travail</h2> : <h2>Modifier le poste de travail</h2>
            }
            <Button buttonType='button' buttonText='Retourner à la liste' onButtonClick={navigateBackToList} />
            <form onSubmit={handleSubmit}>
                <InputField
                    labelText='N° du poste* : ' inputType='number' inputName='number' inputPlaceholder='1, 2, 3, ...'
                    inputValue={numberInput} inputOnChange={(event) => setNumberInput(event.target.value)}
                    inputRequired={true} />
                <CheckboxField
                    labelText='Ce poste de travail est accessible PMR' inputName='is_pmr'
                    inputChecked={isPmrInput} inputOnChange={(event) => setIsPmrInput(event.target.checked)} />
                <Button
                    buttonType='submit'
                    buttonText={isNewWorkplace? 'Ajouter': 'Enregistrer les modifications'} />
            </form>
        </div>
    );
}

export default Workplace;