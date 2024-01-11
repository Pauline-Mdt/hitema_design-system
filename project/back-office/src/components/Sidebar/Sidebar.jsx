import SidebarHeader from "./SidebarHeader/SidebarHeader";
import SidebarNav from "./SidebarNav/SidebarNav";
import SidebarFooter from "./SidebarFooter/SidebarFooter";
import logo from "../../Gorgone-simple.png";
import {Col, Container, Nav, Navbar, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from "../Commons/Button";
import {logout} from "../../services/lesGorgonesApi";
import {removeToken} from "../../services/tokenStorage";
import {removeUser} from "../../services/userStorage";

const Sidebar = ({user}) => {

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
        <>
            <Navbar.Brand href="/" as="header">
                <img
                    alt=""
                    src={logo}
                    height="150"
                    className="d-inline-block align-top"
                />{' '}
                <h1>Les Gorgones</h1>
            </Navbar.Brand>

            <hr/>

            <Navbar expand="lg" className="flex-column">
                <Navbar.Toggle aria-controls="basic-navbar-nav" as="button" />

                <br/>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto flex-column">
                        <Button buttonType='button' buttonText='Se déconnecter' onButtonClick={getLogout} />
                        <br/>
                        <Link to="/">Accueil</Link>
                        <Link to="profile">Mon compte</Link>
                        <Link to="documents">Mes documents</Link>
                        <Link to="tattooist-profile">Mon profil de tatoueur.se</Link>
                        <Link to="tattooist-workplaces">Mon planning de présence</Link>
                        {
                            user.is_admin ? (
                                <>
                                    <br/>
                                    <p>Administration</p>
                                    <Link to="admin/dashboard">Tableau de bord</Link>
                                    <Link to="admin/subscribers">Abonné.e.s newsletter</Link>
                                    <Link to="admin/users">Comptes utilisateurs</Link>
                                    <Link to="admin/documents">Documents</Link>
                                    {/*<li>
                                        <Link to="admin/pictures">Les photos</Link>
                                        </li>
                                        <li>
                                        <Link to="admin/social-networks-tattooists">Réseaux sociaux des tatoueur.se.s</Link>
                                        </li>*/}
                                    <Link to="admin/tattooists-workplaces">Planning de présence des tatoueur.se.s</Link>
                                    <Link to="admin/tattooists">Profils de tatoueur.se.s</Link>
                                    <br/>
                                    <Link to="admin/document-categories">Catégories de document</Link>
                                    <Link to="admin/workplaces">Postes de travail</Link>
                                    <Link to="admin/social-networks">Réseaux sociaux</Link>
                                </>
                            ) : null
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Sidebar;