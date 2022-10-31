import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './services/stateService';
import { BrowserRouter } from 'react-router-dom';

// Provaider  - vspomogatelnyj komponenet dlja raboty s hroniliwem Redux
const root = ReactDOM.createRoot(document.getElementById('root'));
// BrowserRouter - eto glavnyj komponent kotoryi govorit nashemu prilozeniju , 4to zdes ispolzujutsa
// marshruty/Routes/Url  marshruty idut s adressa / url
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


