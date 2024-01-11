import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import {Col, Row} from "react-bootstrap";
import Footer from "../components/Footer/Footer";

function Layout({user}) {
    return (
        <>
            <Row>
                <Col as="aside" lg="auto">
                    <Sidebar user={user} as="navbar"/>
                    {/*<SidebarHeader />*/}
                    {/*<SidebarNav user={user} />*/}
                </Col>
                <Col as="main">
                    <Outlet />
                </Col>
            </Row>
            <Row>
                <Col as="footer" >
                    <Footer />
                </Col>
            </Row>
        </>
    );
}

export default Layout;