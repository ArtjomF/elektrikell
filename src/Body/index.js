import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { getPriceData } from '../services/apiServices';
import ErrorModal from '../ErrorModal';
import moment from 'moment';
import { useSelector, useDispatch} from 'react-redux';
import { setBestTimeRange, setWorstTimeRange } from '../services/stateService';
import { useLocation } from 'react-router-dom';


function Body() {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({});
    const [response, setResponse] = useState(null);
    const [hourNowI, setHourNowI] = useState(0);
    const [x1, setX1] = useState(0);
    const [x2, setX2] = useState(0);
    const hourValue = useSelector ((state) => state.hourValue);
    const selectedCountry = useSelector ((state) => state.selectedCountry);
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

                let priceData = response[selectedCountry.key].map(dataObject => {
                    return {
                        x: moment.unix(dataObject.timestamp).format('HH'),
                        y: dataObject.price,
                        timestamp: dataObject.timestamp,
                    };
                });

                if(!data.country || (data.country !== selectedCountry.key)) {
                    setData({
                        priceData,
                        country: selectedCountry.key,
                    });
                    return;
                }
                const hourNowI = priceData.findIndex(dataObject => {
                    return dataObject.x === moment().format('HH');
                });

                setHourNowI(hourNowI);

                const futureData = priceData.filter((v, i) => i >= 9);
                const areaPrices = [];

                futureData.forEach((v, i, arr) => {
                    const partData = arr.slice(i, i + hourValue + 1);
                    if (partData.length === hourValue + 1) {
                        let result = 0;
                        for (const p of partData) result += p.y;
                        areaPrices.push({ result, i });
                    }
                    return;

                });

                areaPrices.sort((a, b) => a.result - b.result);

                if (location.pathname.includes('/low') || location.pathname === '/') {
                    dispatch(setBestTimeRange({
                        from: futureData[areaPrices[0].i].x,
                        until: futureData[areaPrices[0].i + hourValue].x,
                        timestamp: futureData[areaPrices[0].i].timestamp,
                        bestPrice: futureData[areaPrices[0].i].y,
                    }));
                } else {
                    areaPrices.reverse();
                    dispatch(setWorstTimeRange({
                        from: futureData[areaPrices[0].i].x,
                        until: futureData[areaPrices[0].i + hourValue].x,
                        worstPrice: futureData[areaPrices[0].i].y,
                    }));

                }

                setX1(9 + areaPrices[0].i);
                const x2 = 9 + areaPrices[0].i + hourValue;
                setX2(x2);

            } catch (error) {
                setShowError(true);
                setErrorMessage(error.message);
            }
        })();
    }, [hourValue, data, dispatch, selectedCountry, response, location.pathname]);

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
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis dataKey="y" />
                            <Tooltip />
                            <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <ReferenceLine x={hourNowI} stroke="red" />
                            {
                                location.pathname.includes('/low') || location.pathname === '/'
                                    ? <ReferenceArea x1={x1} x2={x2} stroke="green" fill="green" opacity={0.4} />
                                    : <ReferenceArea x1={x1} x2={x2} stroke="red" fill="red" opacity={0.4} />

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