import {Link} from "react-router-dom";
import {ListGroup, Nav, Stack} from "react-bootstrap";

const TattooistNav = ({isAdminView, isNewTattooist}) => {
    return (
        <Nav variant="tabs" defaultActiveKey="information">
            <Nav.Link eventKey="information">
                <Link to="information">{isAdminView? 'Les info' : 'Mes infos'}</Link>
            </Nav.Link>
            {/*{*/}
            {/*    !isNewTattooist && (*/}
                    <>
                        <Nav.Link eventKey="social-networks" disabled={isNewTattooist} href="social-networks">
                            <Link to="social-networks">{isAdminView ? 'Les réseaux sociaux' : 'Mes réseaux sociaux'}</Link>
                        </Nav.Link>
                        <Nav.Link eventKey="pictures" disabled={isNewTattooist}>
                            <Link to="pictures">{isAdminView? 'Les photos' : 'Mes photos'}</Link>
                        </Nav.Link>
                    </>
            {/*    )*/}
            {/*}*/}
        </Nav>
    );
}

export default TattooistNav;