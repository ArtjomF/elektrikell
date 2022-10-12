import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';



function Header(props) {
    
    const radios = [
        { name: 'High price', value: '1' },
        { name: 'Low price', value: '2' },
      ];
    return (
        <>
            <Row>
                <Col><h3>Elektrikell</h3></Col>
            </Row>
            <Row>
                <Col>Status</Col>

                <Col>
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                name="radio"
                                value={radio.value}
                                checked={props.radioValue === radio.value}
                                onChange={(e) => props.setRadioValue(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col>Hind</Col>
            </Row>
        </>
    )
};


export default Header;

