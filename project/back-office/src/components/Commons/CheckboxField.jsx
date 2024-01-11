const CheckboxField = ({labelText, inputName, inputChecked, inputOnChange, inputDisabled}) => {
    return (
        <label>
            {labelText}
            <input
                type='checkbox'
                name={inputName}
                checked={inputChecked}
                onChange={inputOnChange}
                disabled={inputDisabled}
            />
        </label>
    );
}

export default CheckboxField;