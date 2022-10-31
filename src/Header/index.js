import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { getCurrentPrice } from '../services/apiServices';
import ErrorModal from '../ErrorModal';
import { useSelector, useDispatch } from 'react-redux';
import { setcurrentPrice, setSelectedCountry } from '../services/stateService';
// import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import './header.scss'



function Header() {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    //useSelector - hook kotoryi pomogaet nam sledit za redux state i vozvrawaet nam novove zna4enie
    // useSelector prinimaet funkcijy v kotorom my polu4aem vsjo sostojanie reduxa i vybiraem neohodimoe
    // useSelector pri neobhodimosti zapuskaet render componenta.
    //  useSelector lovit
    const currentPrice = useSelector((state) => state.currentPrice);
    const selectedCountry = useSelector((state) => state.selectedCountry);
    // useDispatch - funkcija otpravki dejstvija/action on prinimaet action kotryi nuzno vypolnit
    // Eto svjaznoj mezdu komponentom i Reduxom
    // Dispatch otprovljaet
    const dispatch = useDispatch();
    // useNavigate eto hook kotoryj dajot nam vozmoznost navigirovat na druguju strani4ku/komponet
    const navigate = useNavigate();
    // useLocation dajot nam informaciju o dannoj strani4ke/url. dajot nam gde my nahodimsja.
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
                // dispatch zapustil action, action v svoju o4ered zapustil Reduser
                // v Reducer perdalis dannye v objekt action.payload
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
        // otpravljet na druguju stranu4ku
        navigate(event.currentTarget.value);
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
                    <Link to="/low">Show low price</Link> 
                    // link i useNavigate eto po suti odno i toze
                    // Link eto komponent kotoryi nas otpravljaet po sylke kotoruju my peredali props to 
                    useNavigate - hook kotoryi ispolzuem vne Jsx
                    */}
                    
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                                name="radio"
                                value={radio.value}
                                checked={location.pathname.includes(radio.value) || (idx === 0 && location.pathname === '/')}
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

