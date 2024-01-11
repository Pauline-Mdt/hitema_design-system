const ListField = ({labelText, nameList, refList, listValue, listOnChange, choiceRequired, choiceDisabled, optionsList}) => {
    return (
        <label>
            {labelText}
            <select
                name={nameList}
                ref={refList}
                value={listValue}
                onChange={listOnChange}
                required={choiceRequired}
                disabled={choiceDisabled}>
                <option value=''>Aucun</option>
                {
                    optionsList.map((option) => (
                        <option key={option.name+'-'+option.id} value={option.id} >{option.name || option.number || (option.first_name+' '+option.last_name)}</option>
                    ))
                }
            </select>
        </label>
    );
}

export default ListField;