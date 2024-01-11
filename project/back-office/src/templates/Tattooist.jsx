import {showAuthUserTattooist, showTattooist} from "../services/lesGorgonesApi";
import {useEffect, useState} from "react";
import {Routes, Route, useParams, useLocation} from "react-router-dom";
import TattooistNav from "../components/TattooistNav";
import TattooistInformation from "../pages/Tattooist/TattooistInformation";
import TattooistSocialNetworks from "../pages/Tattooist/TattooistSocialNetworks";
import TattooistSocialNetwork from "../pages/Tattooist/TattooistSocialNetwork";
import NotFound from "../pages/NotFound";
import Button from "../components/Commons/Button";
import useNavigateTo from "../customHooks/useNatigateTo";
import TattooistPictures from "../pages/Tattooist/TattooistPictures";
import TattooistPicture from "../pages/Tattooist/TattooistPicture";

const Tattooist = () => {
    const url = useLocation().pathname;
    const isAdminView = url.includes('admin');
    const isNewTattooist = url.includes('tattooists/new');
    const {navigateBackToList} = useNavigateTo();
    const {tattooistId} = useParams();

    const [tattooist, setTattooist] = useState({});

    useEffect(() => {
        if (isAdminView) {
            if (!isNewTattooist) {
                showTattooist(tattooistId)
                    .then(({data}) => {
                        setTattooist(data)
                    })
                    .catch(({response}) => {
                        console.log(response)
                    })
            }
        } else {
            showAuthUserTattooist()
                .then(({data}) => {
                    setTattooist(data)
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
                    <h2>{isNewTattooist? 'Ajouter un nouveau profil de tatoueur.se': `Profil de tatoueur.se de ${tattooist.name}`}</h2>
                    : <h2>Mon profil de tatoueur.se</h2>
            }
            {
                isAdminView && (
                    <Button buttonType='button' buttonText='Retourner à la liste' onButtonClick={navigateBackToList} />
                )
            }
            <TattooistNav isAdminView={isAdminView} isNewTattooist={isNewTattooist} />
            <Routes>
                <Route index element={<TattooistInformation isAdminView={isAdminView} isNewTattooist={isNewTattooist} />} />
                <Route path="information" element={<TattooistInformation isAdminView={isAdminView} isNewTattooist={isNewTattooist} />} />
                {
                    !isNewTattooist && (
                        <>
                            <Route path="social-networks" element={<TattooistSocialNetworks isAdminView={isAdminView} />} />
                            <Route path="social-networks/new" element={<TattooistSocialNetwork isAdminView={isAdminView} />} />
                            <Route path="social-networks/:tattooistSocialNetworkId" element={<TattooistSocialNetwork isAdminView={isAdminView} />} />

                            <Route path="pictures" element={<TattooistPictures isAdminView={isAdminView} />} />
                            <Route path="pictures/:pictureId" element={<TattooistPicture isAdminView={isAdminView} />} />
                            <Route path="pictures/new" element={<TattooistPicture isAdminView={isAdminView} />} />
                        </>
                    )
                }
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default Tattooist;