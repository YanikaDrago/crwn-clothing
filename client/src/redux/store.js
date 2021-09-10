import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]; //[thunk]

if (process.env.NODE_ENV === 'development') {  // записи logger в console будут отображаться только в режиме разработки
    middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(...middlewares))
    );

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);