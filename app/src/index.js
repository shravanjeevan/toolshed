import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
//import 'bootstrap/dist/css/bootstrap.min.css';

import AppPage from './bundles/app-page/components/AppPage';
// import reducers from './reducers';

// const store = createStore(reducers, applyMiddleware(thunk));
import Post from './Post/Post'

ReactDOM.render(
        <AppPage />,
    document.querySelector('#root')
);
