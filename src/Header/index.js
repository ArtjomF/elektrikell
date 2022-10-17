import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { getCurrentPrice } from '../services/apiServices';
import ErrorModal from '../ErrorModal';



function Header(props) {

    const [price, setPrice] = useState(0);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage ] = useState('');


    useEffect(() => {
        (async function () {
            try {
                const response = await getCurrentPrice();
                setPrice(response.data[0].price);
            }
            catch (error) {
                setShowError(true);
                setErrorMessage(error.message);
            }
        })();

    }, []);

    const radios = [
        { name: 'Low price', value: 'low' },
        { name: 'Hight price', value: 'high' },
    ];
    function handleOnChange(event) {
        // event.preventDefault();
        props.setRadioValue(event.currentTarget.value);

    }
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
                                variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                                name="radio"
                                value={radio.value}
                                checked={props.radioValue === radio.value}
                                onChange={handleOnChange}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col>Hind {price}eur /MWh </Col>
            </Row>
            <ErrorModal errorMassage={errorMessage} show={showError} setShow={setShowError}/>
        </>
    );
};


export default Header;

