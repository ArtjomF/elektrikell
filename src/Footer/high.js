import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function High({ currentprice, worstTimeRange }) {
    return (
        <>
            <Row>

                <Col>Järgmine tiputund on</Col>
            </Row>
            <Row>
                <Col>{`${worstTimeRange.from}:00st ${worstTimeRange.until}:00ni`}</Col>
            </Row>
            <Row>
                <Col>Siis on kilovatt-tunni hind {currentprice} eur,
                    mis on {Math.round(100 - worstTimeRange.worstPrice / currentprice * 100)}% kallim kui praegu
                </Col>
            </Row>
            <Row>
                <Col>Soovitame tiptundide ajal vähendada elektri tarbimist, et aidata kaasa Euroopa ühisele eesmärgile alandada tiputundidel -5% elektri tarbmist ja vähendada maagaasi nõudlust. Loe lähemalt</Col>
            </Row>
        </>
    );
};

export default High;
