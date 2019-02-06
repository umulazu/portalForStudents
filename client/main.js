import 'typeface-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
//import reducer from './rootReducer'
import { Provider } from 'react-redux'
import Router from 'react-router/Router'
import createBrowserHistory from 'history/createBrowserHistory'
import AppView from './layout/appview'
//import { getInitialStateFromServer, init } from './applicationActions'
import reducer from './authorization/reducer'
import createStore from './utilities/createStore'
import UserControls from './authorization/components/userControls'

//const username = window['APP_CONFIG'].username;

const history = createBrowserHistory();

const store = createStore(reducer);

//store.dispatch(init({ username }));

const renderApp = (app) => {
    ReactDOM.render(
         <Provider store={store}>
             <div>
                <Router history={history}>
                    {app}
                </Router>
             <UserControls/>
             </div>
            </Provider>,
        document.getElementById('root')
    )
};

renderApp(<AppView />);

/*if (module.hot) {
    module.hot.accept('./layout/appview', () => {
        const nextApp = require('./layout/appview').default
        renderApp(nextApp)
    })

    module.hot.accept('./rootReducer', () => {
        const nextReducer = require('./rootReducer').default
        store.replaceReducer(nextReducer)
    })

    module.hot.accept('./rootSaga', () => {
        const newRootSaga = require('./rootSaga').default
        sagaRun.cancel()
        sagaRun.done.then(() => {
            sagaRun = sagaMiddleware.run(function* replaceSaga() {
                yield newRootSaga({ history })
            })
        })
    })
}*/