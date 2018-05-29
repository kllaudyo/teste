import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import NFeMnRApp from "./NFeMnRApp";

ReactDOM.render(
    <BrowserRouter>
        <NFeMnRApp {...document.getElementById('root').dataset} />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
