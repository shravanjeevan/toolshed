import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router,Route} from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
//import 'bootstrap/dist/css/bootstrap.min.css';

import App from './bundles/app-page/components/App';
// import reducers from './reducers';

// const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
        <App />,
    document.querySelector('#root')
);
