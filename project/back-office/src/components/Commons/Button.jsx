const Button = ({buttonText, buttonType, onButtonClick}) => {
    return (
        <button
            type={buttonType}
            onClick={onButtonClick}
        >
            {buttonText}
        </button>
    );
}

export default Button;