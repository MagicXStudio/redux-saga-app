import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import createSagaMiddleware from 'redux-saga'
import { StoreEnhancer } from '@reduxjs/toolkit';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const enhancer: StoreEnhancer = applyMiddleware(sagaMiddleware);
    const store = createStore(rootReducer, enhancer);
    const config = {
        ...store,
        runSaga: sagaMiddleware.run,
    }
    return config;
}


