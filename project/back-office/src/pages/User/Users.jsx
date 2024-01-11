import {useEffect, useState} from "react";
import {deleteUser, listUsers} from "../../services/lesGorgonesApi";
import {Link} from "react-router-dom";
import Button from "../../components/Commons/Button";
import useNavigateTo from "../../customHooks/useNatigateTo";
import {Table} from "react-bootstrap";

const Users = () => {
    const {navigateToNew} = useNavigateTo();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        listUsers()
            .then(({data}) => {
                setUsers(data)
            })
            .catch(({response}) => {
                console.log(response)
            })
    }, []);

    const deleteSelectedUser = (id) => {
        deleteUser(id)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(({response}) => {
                console.log(response.data)
            })
    }

    return (
        <div>
            <h2>Les utilisateurs</h2>
            <Button buttonType='button' buttonText='Ajouter un nouveau compte utilisateur' onButtonClick={navigateToNew} />
            <h3>Utilisateurs</h3>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Profil tatoueur.se</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    user.is_admin === 0?
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.tattooist_id}</td>
                            <td><Link to={`${user.id}`}>Modifier</Link></td>
                            <td><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedUser(user.id)} /></td>
                        </tr> : null
                ))}
                </tbody>
            </Table>

            <h3>Administrateurs</h3>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Profil tatoueur.se</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    user.is_admin === 1?
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.tattooist_id}</td>
                            <td><Link to={`${user.id}`}>Modifier</Link></td>
                            <td><Button buttonType='button' buttonText='Supprimer' onButtonClick={() => deleteSelectedUser(user.id)} /></td>
                        </tr> : null
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Users;