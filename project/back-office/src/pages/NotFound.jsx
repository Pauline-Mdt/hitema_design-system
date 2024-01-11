import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h2>404</h2>
            <p>
                <Link to="">Retourner à la page d'accueil</Link>
            </p>
        </div>
    )
}

export default NotFound;