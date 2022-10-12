import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header/index.js';
import Body from './Body/index.js';
import Footer from './Footer/index.js';

function App() {
  const [radioValue, setRadioValue] = useState('low');
  const [hourValue, setHourValue] = useState(1);

  return (

    <Container>
      <Header  setRadioValue={setRadioValue} radioValue={radioValue}/>
      <Body radioValue={radioValue} hourValue={hourValue}/> 
      <Footer radioValue={radioValue} setHourValue={setHourValue} hourValue={hourValue}/>
    </Container>
  );
}

export default App;
