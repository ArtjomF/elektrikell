import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Countdown from 'react-countdown';


function Low({ hourValue, setHourValue }) {

    const endOfDay = new Date().setHours(23, 59, 59, 999)
    const cheapHours = [
        { label: '1h', value: '1' },
        { label: '2h', value: '2' },
        { label: '3h', value: '3' },
        { label: '4h', value: '4' },
        { label: '6h', value: '6' },
        { label: '8h', value: '8' },
    ];
    function handleOnChange(event) {
        setHourValue(event.currentTarget.value);
    }

    return (
        <>
            <Row>

                <Col>
                    <ButtonGroup>
                        {cheapHours.map(hour => (
                            <ToggleButton
                                key={hour.value}
                                id={`hour-${hour.value}`}
                                type="radio"
                                name="hour"
                                value={hour.value}
                                checked={hourValue === hour.value}
                                onChange={handleOnChange}
                            >
                                {hour.label}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col>Parim aeg selleks on 0:00st 1:00ni, milleni on jäänud</Col>
            </Row>
            <Row>
                <Col>
                    <Countdown date={endOfDay} />
                </Col>
            </Row>
            <Row>
                <Col>Siis on kilovatt-tunni hind 11.30 senti, mis on 75% odavam kui praegu</Col>
            </Row>
        </>
    );
};

export default Low;