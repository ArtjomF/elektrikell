import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header/index.js';
import Body from './Body/index.js';
import Footer from './Footer/index.js';

function App() {
  const [currentprice, setcurrentPrice] = useState(0);
  const [radioValue, setRadioValue] = useState('low');
  const [hourValue, setHourValue] = useState(1);
  const [bestTimeRange, setBestTimeRange] = useState({
    from: 0,
    until: 0,
    timestamp: null,
    bestPrice: 0,
  });

  const [worstTimeRange, setWorstTimeRange] = useState({
    from: 0,
    until: 0,
    worstPrice: 0,
  });

  return (

    <Container>
      <Header
        setRadioValue={setRadioValue}
        radioValue={radioValue}
        currentprice={currentprice}
        setcurrentPrice={setcurrentPrice} />
      <Body radioValue={radioValue} hourValue={hourValue} setBestTimeRange={setBestTimeRange} setWorstTimeRange={setWorstTimeRange} />
      <Footer
        radioValue={radioValue}
        setHourValue={setHourValue}
        hourValue={hourValue}
        bestTimeRange={bestTimeRange}
        currentprice={currentprice}
        worstTimeRange={worstTimeRange}/>
    </Container>
  );
}

export default App;
