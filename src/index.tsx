import React from 'react';
import createRoot from 'react-dom';
import './index.css';
import {App} from './app/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from './redux/store';
import {BrowserRouter, HashRouter} from "react-router-dom";

createRoot.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// в gh-pages лучше работает HashRouter

serviceWorker.unregister();
