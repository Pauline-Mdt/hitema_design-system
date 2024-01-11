import {useState} from "react";
import {checkToken, http, login} from "../services/lesGorgonesApi";
import Button from "../components/Commons/Button";
import InputField from "../components/Commons/InputField";

const Login = ({setToken, setUser}) => {
    const [error, setError] = useState({});
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        setError({});
        login(emailInput, passwordInput)
            .then(({data}) => {
                setToken(data.token)
                setUser(data.user)
                window.location.reload()
            })
            .catch(({response}) => setError(response))
    }

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <InputField labelText='Email* : ' inputType='email' inputName='email' inputPlaceholder='email@exemple.com' inputValue={emailInput} inputOnChange={(event) => setEmailInput(event.target.value)} inputRequired={true} />
                <InputField labelText='Mot de passe* : ' inputType='password' inputName='password' inputValue={passwordInput} inputOnChange={(event) => setPasswordInput(event.target.value)} inputRequired={true} />
                <Button buttonType='submit' buttonText='Se connecter' />
            </form>
        </div>
    )
}

export default Login;