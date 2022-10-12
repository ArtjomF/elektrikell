import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Header from './Header/Header.js';
import Body from './Body/Body.js';
import Footer from './Footer/Footer.js';

function App() {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'High price', value: '1' },
    { name: 'Low price', value: '2' },
  ];
  return (

    <Container>
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
      {/* <Row>
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
                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
        <Col>Hind</Col>
      </Row>
      <Row>

      </Row>
      <Row>

        <Col>Järgmine tiputund on</Col>
      </Row>
      <Row>
        <Col>21:00st 22:00ni</Col>
      </Row>
      <Row>
        <Col>Siis on kilovatt-tunni hind 30.00 senti, mis on 26% kallim kui praegu</Col>
      </Row>
      <Row>
        <Col>Soovitame tiptundide ajal vähendada elektri tarbimist, et aidata kaasa Euroopa ühisele eesmärgile alandada tiputundidel -5% elektri tarbmist ja vähendada maagaasi nõudlust. Loe lähemalt</Col>
      </Row> */}
    </Container>
  );
}

export default App;
