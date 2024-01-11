import {Link} from "react-router-dom";
import {logout, showAuthUser} from "../../../services/lesGorgonesApi";
import Button from "../../Commons/Button";
import {removeToken} from "../../../services/tokenStorage";
import {useEffect} from "react";
import {removeUser} from "../../../services/userStorage";
import {useState} from "react";

const SidebarNav = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        showAuthUser()
            .then(({data}) => {
                setUser(data)
            })
            .catch(({response}) => {
                console.log(response)
                alert(response.data.message)
            })
    }, [])

    const getLogout = () => {
        logout()
            .then(({data}) => {
                console.log(data)
            })
            .catch(({response}) => {
                console.log(response)
                alert(response.data.message)
            })
        removeToken();
        removeUser();
        window.location.reload();
    }

    return (
        <nav>
            <Button buttonType='button' buttonText='Se déconnecter' onButtonClick={getLogout} />
            <ul>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <Link to="profile">Mon compte</Link>
                </li>
                <li>
                    <Link to="documents">Mes documents</Link>
                </li>
                <li>
                    <Link to="tattooist-profile">Mon profil de tatoueur.se</Link>
                </li>
                <li>
                    <Link to="tattooist-workplaces">Mon planning de présence</Link>
                </li>
            </ul>
            {
                user.is_admin ? (
                    <ul>
                        <p>Administration</p>
                        <li>
                            <Link to="admin/dashboard">Tableau de bord</Link>
                        </li>
                        <li>
                            <Link to="admin/subscribers">Abonné.e.s newsletter</Link>
                        </li>
                        <li>
                            <Link to="admin/users">Comptes utilisateurs</Link>
                        </li>
                        <li>
                            <Link to="admin/documents">Documents</Link>
                        </li>
                        {/*<li>
                            <Link to="admin/pictures">Les photos</Link>
                        </li>
                        <li>
                            <Link to="admin/social-networks-tattooists">Réseaux sociaux des tatoueur.se.s</Link>
                        </li>*/}
                        <li>
                            <Link to="admin/tattooists-workplaces">Planning de présence des tatoueur.se.s</Link>
                        </li>
                        <li>
                            <Link to="admin/tattooists">Profils de tatoueur.se.s</Link>
                        </li>
                        <br/>
                        <li>
                            <Link to="admin/document-categories">Catégories de document</Link>
                        </li>
                        <li>
                            <Link to="admin/workplaces">Postes de travail</Link>
                        </li>
                        <li>
                            <Link to="admin/social-networks">Réseaux sociaux</Link>
                        </li>
                    </ul>
                ) : null
            }
        </nav>
    );
}

export default SidebarNav;