const InputField = ({labelText, inputType, inputName, inputPlaceholder, refInput, inputValue, inputOnChange, inputRequired, inputDisabled}) => {
    return (
        <label>
            {labelText}
            <input
                type={inputType}
                name={inputName}
                placeholder={inputPlaceholder}
                ref={refInput}
                value={inputValue}
                onChange={inputOnChange}
                required={inputRequired}
                disabled={inputDisabled}
            />
        </label>
    );
}

export default InputField;