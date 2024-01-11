import {useState} from "react";
import {getToken, saveToken} from "../services/tokenStorage";

const useToken = () => {
    const [token, setToken] = useState(getToken);

    const setNewToken = (userToken) => {
        saveToken(userToken);
        setToken(userToken);
    }

    return {
        token,
        setToken: setNewToken,
    };
}

export default useToken;