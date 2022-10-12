import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function Footer() {
    return (
        <>
            <Row>

                <Col>Järgmine tiputund on</Col>
            </Row>
            <Row>
                <Col>21:00st 22:00ni</Col>
            </Row>
            <Row>
                <Col>Siis on kilovatt-tunni hind 30.00 senti, mis on 26% kallim kui praegu</Col>
            </Row>
            <Row>
                <Col>Soovitame tiptundide ajal vähendada elektri tarbimist, et aidata kaasa Euroopa ühisele eesmärgile alandada tiputundidel -5% elektri tarbmist ja vähendada maagaasi nõudlust. Loe lähemalt</Col>
            </Row>
        </>
    )
};


export default Footer;