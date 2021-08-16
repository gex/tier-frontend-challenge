import React from 'react';
import logo from './img/tier-logo.svg';
import './css/App.css';
import { ShortenUrlForm } from './components';

function App() {
    return (
        <div className="app">
            <header className="header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Change mobility for good</p>
            </header>
            <ShortenUrlForm />
        </div>
    );
}

export default App;
