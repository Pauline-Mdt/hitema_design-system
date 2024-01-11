import {useState} from "react";
import {getUser, saveUser} from "../services/userStorage";

const useUser = () => {
    const [user, setUser] = useState(getUser);

    const setNewUser = currentUser => {
        saveUser(currentUser);
        setUser(currentUser);
    }

    return {
        user,
        setUser: setNewUser,
    };
}

export default useUser;