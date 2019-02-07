import 'typeface-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from 'react-router/Router'
import createBrowserHistory from 'history/createBrowserHistory'
import AppView from './layout/appview'
import reducer from './authorization/reducer'
import createStore from './utilities/createStore'

const history = createBrowserHistory();

const store = createStore(reducer);

const renderApp = (app) => {
    ReactDOM.render(
         <Provider store={store}>
             <div>
                <Router history={history}>
                    {app}
                </Router>
             </div>
            </Provider>,
        document.getElementById('root')
    )
};

renderApp(<AppView />);
/*
if (module.hot) {
    module.hot.accept('./layout/appview', () => {
        const nextApp = require('./layout/appview').default;
        renderApp(nextApp)
    });
}*/