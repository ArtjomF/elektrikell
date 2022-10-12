import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


function Footer() {
    return (
        <div>
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
            </Row>
        </div>
    )
};


export default Footer;