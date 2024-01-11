const TextareaField = ({labelText, inputName, inputPlaceholder, inputValue, inputOnChange, inputRequired, inputDisabled}) => {
    return (
        <label>
            {labelText}
            <textarea
                name={inputName}
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={inputOnChange}
                required={inputRequired}
                disabled={inputDisabled}
            />
        </label>
    );
}

export default TextareaField;