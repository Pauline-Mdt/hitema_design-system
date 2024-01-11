import logo from '../../logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import useToken from "../../customHooks/useToken";
import {useEffect, useState} from "react";
import {showAuthUser} from "../../services/lesGorgonesApi";
import Login from "../../pages/Login";
import Layout from "../../templates/Layout";
import Home from "../../pages/Home";
import User from "../../pages/User/User";
import Documents from "../../pages/Document/Documents";
import Tattooist from "../../templates/Tattooist";
import Dashboard from "../../pages/Dashboard";
import Document from "../../pages/Document/Document";
import DocumentCategories from "../../pages/DocumentCategory/DocumentCategories";
import SocialNetworks from "../../pages/SocialNetwork/SocialNetworks";
import SocialNetwork from "../../pages/SocialNetwork/SocialNetwork";
import Subscribers from "../../pages/Subscriber/Subscribers";
import Subscriber from "../../pages/Subscriber/Subscriber";
import Tattooists from "../../pages/Tattooist/Tattooists";
import Users from "../../pages/User/Users";
import Workplaces from "../../pages/Workplace/Workplaces";
import Workplace from "../../pages/Workplace/Workplace";
import NotFound from "../../pages/NotFound";
import DocumentCategory from "../../pages/DocumentCategory/DocumentCategory";
import TattooistWorkplaces from "../../pages/TattooistWorkplace/TattooistWorkplaces";
import TattooistsWorkplaces from "../../pages/TattooistWorkplace/TattooistsWorkplaces";
import TattooistWorkplace from "../../pages/TattooistWorkplace/TattooistWorkplace";

const App = () => {
    const {token, setToken} = useToken();
    // const {user, setUser} = useUser();
    const [user, setUser] = useState({});

    useEffect(() => {
        showAuthUser()
            .then(({data}) => {
              setUser(data)
              console.log(user)
            })
            .catch(({response}) => {
              console.log(response)
            })
    }, []);

    if (!token) {
        return <Login setToken={setToken} setUser={setUser} />;
    }

    return (
        <div className="App">
            <Routes>
                <Route element={<Layout user={user} setUser={setUser} />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<User />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="tattooist-profile/*" element={<Tattooist />} />
                    <Route path="tattooist-workplaces" element={<TattooistWorkplaces />} />

                    {
                        user.is_admin ? (
                            <Route path="admin">
                                <Route index element={<Dashboard />} />
                                <Route path="dashboard" element={<Dashboard />} />

                                <Route path="documents" element={<Documents />} />
                                <Route path="documents/:documentId" element={<Document />} />
                                <Route path="documents/new" element={<Document />} />

                                <Route path="document-categories" element={<DocumentCategories />} />
                                <Route path="document-categories/new" element={<DocumentCategory />} />
                                <Route path="document-categories/:documentCategoryId" element={<DocumentCategory />} />

                                <Route path="social-networks" element={<SocialNetworks />} />
                                <Route path="social-networks/:socialNetworkId" element={<SocialNetwork />} />
                                <Route path="social-networks/new" element={<SocialNetwork />} />

                                <Route path="subscribers" element={<Subscribers />} />
                                <Route path="subscribers/:subscriberId" element={<Subscriber />} />
                                <Route path="subscribers/new" element={<Subscriber />} />

                                <Route path="tattooists" element={<Tattooists />} />
                                <Route path="tattooists/new/*" element={<Tattooist />} />
                                <Route path="tattooists/:tattooistId/*" element={<Tattooist />} />

                                <Route path="tattooists-workplaces" element={<TattooistsWorkplaces />} />
                                <Route path="tattooists-workplaces/:tattooistWorkplaceId" element={<TattooistWorkplace />} />
                                <Route path="tattooists-workplaces/new" element={<TattooistWorkplace />} />

                                <Route path="users" element={<Users />} />
                                <Route path="users/new" element={<User />} />
                                <Route path="users/:userId" element={<User />} />

                                <Route path="workplaces" element={<Workplaces />} />
                                <Route path="workplaces/new" element={<Workplace />} />
                                <Route path="workplaces/:workplaceId" element={<Workplace />} />
                            </Route>
                        ) : null
                    }

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
