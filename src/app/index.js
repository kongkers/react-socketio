import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './components/app';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/styles.css';

injectTapEventPlugin();

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </BrowserRouter>,
document.getElementById('demoApp')
)

