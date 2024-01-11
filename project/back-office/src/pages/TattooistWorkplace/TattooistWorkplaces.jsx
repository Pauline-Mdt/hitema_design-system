import {useLocation} from "react-router-dom";
import {listTattooistWorkplaces, showAuthUserTattooist} from "../../services/lesGorgonesApi";
import {useEffect, useState} from "react";
import Calendar from "../../components/Commons/Calendar";

const TattooistWorkplaces = () => {
    const url = useLocation().pathname;
    const isAdminView = url.includes('admin');

    const [tattooistWorkplaces, setTattooistWorkplaces] = useState([]);

    useEffect(() => {
        if (isAdminView) {
            // if (!isNewUser) {
            //     showUser(userId)
            //         .then(({data}) => {
            //             setIdInput(data.id)
            //             setTattooistIdInput(data.tattooist_id)
            //             setIsAdminInput(data.is_admin)
            //             setFirstNameInput(data.first_name)
            //             setLastNameInput(data.last_name)
            //             setEmailInput(data.email)
            //         })
            //         .catch(({response}) => {
            //             console.log(response)
            //         })
            // }
        } else {
            showAuthUserTattooist()
                .then(({data}) => {
                    listTattooistWorkplaces(data.id)
                        .then(({data}) => {
                            setTattooistWorkplaces(data)
                        })
                        .catch(({response}) => {
                            console.log(response)
                        })
                })
                .catch(({response}) => {
                    console.log(response)
                })
        }
    }, []);

    return (
        <div>
            {
                isAdminView ?
                    <h2>Le planning de présence des tatoueur.se.s</h2>
                    : <h2>Mon planning de présence</h2>
            }
            <Calendar isAdminView={isAdminView} tattooistsWorkplacesEvents={tattooistWorkplaces} />
        </div>
    );
}

export default TattooistWorkplaces;