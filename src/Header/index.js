import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { getCurrentPrice, localUrl } from '../services/apiServices';
import ErrorModal from '../ErrorModal';
import { useSelector, useDispatch } from 'react-redux';
import { setcurrentPrice, setSelectedCountry } from '../services/stateService';
// import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import './header.scss'



function Header() {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const currentPrice = useSelector((state) => state.currentPrice);
    const selectedCountry = useSelector((state) => state.selectedCountry);
    const hourValue = useSelector((state) => state.hourValue);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const countries = [
        { key: 'ee', title: 'Eesti' },
        { key: 'fi', title: 'Soome' },
        { key: 'lv', title: 'Lati' },
        { key: 'lt', title: 'Leedu' },
    ];

    useEffect(() => {
        (async function () {
            try {
                const response = await getCurrentPrice(selectedCountry);
                dispatch(setcurrentPrice(response.data[0].price));
            }
            catch (error) {
                setShowError(true);
                setErrorMessage(error.message);
            }
        })();

    }, [dispatch, selectedCountry]);

    const radios = [
        { name: 'Low price', value: '/low' },
        { name: 'Hight price', value: '/high' },
    ];

    function handleOnChangePrice(event) {
        // event.preventDefault();
        navigate(localUrl + event.currentTarget.value + `/${hourValue}`);
    }

    function handleOnSelectCountry(key, event) {
        dispatch(setSelectedCountry(countries.find(country => country.key === key)));
    }

    return (
        <>
            <Row className='mt-2'>
                <Col><h1>Elektrikell</h1></Col>
                <Col>
                    <DropdownButton
                        key="Secondary"
                        id={`dropdown-variants-secondary`}
                        variant="secondary"
                        onSelect={handleOnSelectCountry}
                        title={selectedCountry.title}
                        className="float-end"


                    >
                        {countries.map(country => <Dropdown.Item key={country.key} eventKey={country.key}>{country.title}</Dropdown.Item>)}

                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col>Status</Col>
               <Col className="text-center">
                    {/* <Link to="/high">Show high price</Link>
                    <Link to="/low">Show low price</Link> */}
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                                name="radio"
                                value={radio.value}
                                checked={location.pathname.includes(radio.value) || (idx === 0 && !location.pathname.includes('/low') && !location.pathname.includes('/high'))}
                                onChange={handleOnChangePrice}
                                
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col className="text-end">Hind {currentPrice}eur /MWh</Col>
            </Row>
            <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError} />
        </>
    );
};


export default Header;

