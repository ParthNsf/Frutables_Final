import { thunk } from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from '.';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


export const configureStore = () => {
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['fruitFacilities']
    }


    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(persistedReducer, applyMiddleware(thunk));

    let persistor = persistStore(store)
    return { store, persistor }
};