import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/glapp.css';

import GLApp from "./GLApp";

import reportWebVitals from './reportWebVitals';


//This gives our components access to browser page history and current URL for this window
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {/*<React.StrictMode>*/}
            <GLApp />
        {/*</React.StrictMode>*/}
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
