const { createStore } = require("redux");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer ,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
const { Reducers } = require("./src/reducer/Reducers");

const persistConfig = {
    key : 'root',
    storage : AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, Reducers);

const mystore = configureStore({
    reducer : persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

const persistor = persistStore(mystore);
export {mystore , persistor};
// export const mystore = createStore(Reducers)