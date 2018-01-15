import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';

import App from './components/app/App'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
    console.log('State Updated:', store.getState())
})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

