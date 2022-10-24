import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { getPriceData } from '../services/apiServices';
import ErrorModal from '../ErrorModal';
import moment from 'moment';

function Body({
    radioValue,
    hourValue,
    setBestTimeRange,
    setWorstTimeRange,
    selectedCountry,
}) {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState([null]);
    const [response, setResponse] = useState(null);
    const [hourNowI, setHourNowI] = useState(0);
    const [x1, setX1] = useState(0);
    const [x2, setX2] = useState(0);

    useEffect(() => {
        // vnutri otkryli asynchronnuju funkciju kototraja momentalno zapuskaetsja
        // takije funkcii nazyvajutsja - "nemedlenno vyzyvaemaja funkcija"
        (async function () {
            // try- probujet vypolnit vsjo 4to nahoditsja v ego skope{}.
            // pri obnaruzenii oshibki try ostanavlivajetsja i zapuskajet catch scope {} perdav emu oshibku
            try {
                // my sprashivajem est li otvet s aapi v sostojanii komponenta 
                if (!response) {
                    // esli net to my delajem zapros i sohronjaem v sostojanii komponenta
                    const response = await getPriceData();
                    setResponse(response.data);
                    return; // garantiruem 4toby kod dalshe ne vqpolnjalsja
                }
                // vzjav otvet s api my vyberaem vqbrannyj polzovatelem staranu (ee)
                // na massiv s dannymi my zapuskaem cykl map kotoryj nam vozvrawaet novyi massiv
                let priceData = response[selectedCountry.key].map(dataObject => {
                    // v cqkle my s timestamp vzjali 4asy "HH" i nazna4ili x - y 
                    // y = cena
                    // x = vremja
                    // timestamp = UNIX timestamp = sekundy s 01.01.1970
                    return {
                        x: moment.unix(dataObject.timestamp).format('HH'),
                        y: dataObject.price,
                        timestamp: dataObject.timestamp,
                    };
                });
                setData(priceData); // nazna4ili novyi massiv s obrabotannymi dannymi

                // iwem index v kotorom zapisan dannyi 4as
                const hourNowI = priceData.findIndex(dataObject => {
                    return dataObject.x === moment().format('HH');
                });

                setHourNowI(hourNowI);

                // vydeljem / filtruem massiv gte tolko buduwee vremja, poskolku znaem 4to buduwee vremja nastupaet posle 9-ogo indexa
                const futureData = priceData.filter((v, i) => i >= 9);
                const areaPrices = [];
                
                // dopustim is4em tri samyh deshovyh 4asa 
                // zapuskajem cykl na buduwii vremena, kazdyi cykl berjot buduwie  3 4asa / 3 element massiva
                // summirujet ih i zapisyvajet v novyi massiv s tekuwim indexom 
                // takim obrazom my nahodim samyj deshovyi diapozon v 3 4asa.
                futureData.forEach((v, i, arr) => {
                    const partData = arr.slice(i, i + hourValue + 1);
                    if (partData.length === hourValue + 1) {
                        let result = 0;
                        for (const p of partData) result += p.y;
                        areaPrices.push({ result, i });
                    }
                    return;

                });

                // sortiruem po summe, deshovye v na4alo
                areaPrices.sort((a, b) => a.result - b.result);
                if (radioValue === 'low') {
                // esli hotim znat samye deshovye ceny 
                // berjom buduwie vremena i iwem objekt s cennoj po pervomu/deshovomu indexu
                // sostovljem nashi dannye dlja grafika i s4jot4ika

                    setBestTimeRange({
                        from: futureData[areaPrices[0].i].x,
                        until: futureData[areaPrices[0].i + hourValue].x,
                        timestamp: futureData[areaPrices[0].i].timestamp,
                        bestPrice: futureData[areaPrices[0].i].y,
                    });
                } else {
                    // esli hotim samye dorogii to my perevara4ivaem samye deshovye summq. Teper porjadok s dorogih na deshovye
                    areaPrices.reverse();
                    setWorstTimeRange({
                        from: futureData[areaPrices[0].i].x,
                        until: futureData[areaPrices[0].i + hourValue].x,
                        worstPrice: futureData[areaPrices[0].i].y,
                    });

                }
                // dobovljaem prosloe dlja grafika i nazna4aem to4ki dlja vybrannogo grafika (3 4asa)
                setX1(9 + areaPrices[0].i);
                const x2 = 9 + areaPrices[0].i + hourValue;
                setX2(x2);
            } catch (error) {
                setShowError(true);
                setErrorMessage(error.message);
            }
        })();
    }, [hourValue, data, setBestTimeRange, setWorstTimeRange, radioValue, selectedCountry, hourNowI, response]);

    return (
        <>
            <Row>
                <Col>
                    <ResponsiveContainer width="100%" height="100%" minHeight="500px">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
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
                                radioValue === 'low'
                                    ? <ReferenceArea x1={x1} x2={x2} stroke="green" fill="green" opacity={0.3} />
                                    : <ReferenceArea x1={x1} x2={x2} stroke="red" fill="red" opacity={0.3} />

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