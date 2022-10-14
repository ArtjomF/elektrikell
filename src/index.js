import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// React dom otve4aet za svjaz mezdu Reactom i DOM;
//DOM - (Document object model) - Eta struktura html document v javaskript objekte.
const root = ReactDOM.createRoot(document.getElementById('root'));
// Zdes my berjom iz document(DOM) element s id "root" i vstavljem v etot element react prilizenije.
root.render(
    <App />
);
// render berjot React elementy/componenety i obrobatyvaet ih v html (DOM).

//Prostoe objasninie po4emu React:
//Iz za componentov i sostojanija react izmenjet tolko to 4to neohodimo, sledstvenno sait rabotaet bystro.

