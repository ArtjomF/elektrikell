import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { getPriceData, handleData } from '../services/apiServices';
import ErrorModal from '../ErrorModal';
import { useSelector, useDispatch } from 'react-redux';
import { setBestTimeRange, setWorstTimeRange } from '../services/stateService';
import { useLocation } from 'react-router-dom';
import './body.scss'

function Body() {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({});
    const [response, setResponse] = useState(null);
    const [x, setX] = useState({
        x1: 0,
        x2: 0,
    });
    const hourValue = useSelector((state) => state.hourValue);
    const selectedCountry = useSelector((state) => state.selectedCountry);
    const dispatch = useDispatch();
    const location = useLocation();
    

    useEffect(() => {
        (async function () {
            try {
                if (!response) {
                    const response = await getPriceData();
                    setResponse(response.data);
                    return;
                }
                handleData(
                    response,
                    selectedCountry.key,
                    data,
                    setData,
                    location,
                    hourValue,
                    dispatch,
                    setBestTimeRange,
                    setWorstTimeRange,
                    setX,
                )

            } catch (error) {
                setShowError(true);
                setErrorMessage(error.message);
            }
        })();
    }, [hourValue, data, dispatch, selectedCountry, response, location]);

    return (
        <>
            <Row>
                <Col>
                    <ResponsiveContainer width="100%" height="100%" minHeight="500px">
                        <LineChart
                            width={500}
                            height={300}
                            data={data.priceData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="10 6" />
                            <XAxis dataKey="x" />
                            <YAxis dataKey="price" />
                            <Tooltip />
                            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <ReferenceLine x={data.priceData?.findIndex(d => d.now)} stroke="red" />
                            {
                                location.pathname.includes('/low') || location.pathname === '/'
                                    ? <ReferenceArea x1={x.x1} x2={x.x2} stroke="green" fill="green" opacity={0.4} />
                                    : <ReferenceArea x1={x.x1} x2={x.x2} stroke="red" fill="red" opacity={0.4} />

                            }

                        </LineChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
            <ErrorModal errorMassage={errorMessage} show={showError} setShow={setShowError} />
        </>

    )
};


export default Body;