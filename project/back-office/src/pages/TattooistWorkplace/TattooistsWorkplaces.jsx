import {useLocation} from "react-router-dom";
import {listTattooistsWorkplaces, listTattooistWorkplaces, showAuthUserTattooist} from "../../services/lesGorgonesApi";
import {useEffect, useState} from "react";
import Calendar from "../../components/Commons/Calendar";

const TattooistsWorkplaces = () => {
    const url = useLocation().pathname;
    const isAdminView = url.includes('admin');

    const [tattooistsWorkplaces, setTattooistsWorkplaces] = useState([]);

    useEffect(() => {
        if (isAdminView) {
            listTattooistsWorkplaces()
                .then(({data}) => {
                    setTattooistsWorkplaces(data)
                    console.log(data)
                })
                .catch(({response}) => {
                    console.log(response)
                })
        } else {
            showAuthUserTattooist()
                .then(({data}) => {
                    listTattooistWorkplaces(data.id)
                        .then(({data}) => {
                            setTattooistsWorkplaces(data)
                            console.log(data)
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
            <Calendar isAdminView={isAdminView} tattooistsWorkplacesEvents={tattooistsWorkplaces} />
        </div>
    );
}

export default TattooistsWorkplaces;