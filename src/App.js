import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header/index.js';
import Body from './Body/index.js';
import Footer from './Footer/index.js';

// App - react komponent, napisan 4erez funkcju.
// Komponenty vsegda na4inajutsja s ZAGLAVNOI bukvy
// Komponenty kak i funkcii prinemajut argumenty tolko nazyvajutsja oni tut propertis(props)
// Komponent vozvrawajet(return) React element / JSX.
// React element dolzen sodrzat odin zaglavnyi element - <Conteiner/>, <div/>, html, javascript
function App() {
  const [radioValue, setRadioValue] = useState('low');
  const [hourValue, setHourValue] = useState(1);
// useState - eto React hook, pozvoljajuwij rabotat s sostojaniem komponenta
// useState prinimaet kak argument izno4alnoe sostajanie. radioValue = 'low'.
// useState vozvrawaet massiv iz dvuh elementov
// [1] = izno4alnoe ili novoe zna4enie sostojanie/peremennoi
// [2] = funkciju kototraja mozet izmenit zna4enije sostojanija/peremennoj
// pri izmenenii sostjanija zapuskaetsja rerender componenta
// Vse nazvanija React hook s 'use'; vse funkcii izmenenija sostojanija na4inajutsja s 'set'.
  return (

    <Container>
      <Header  setRadioValue={setRadioValue} radioValue={radioValue}/>
      <Body radioValue={radioValue} hourValue={hourValue}/> 
      <Footer radioValue={radioValue} setHourValue={setHourValue} hourValue={hourValue}/>
    </Container>
  );
}

export default App;
