import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Reducers
import UserReducer from './reducers/UserReducer'

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
    user: UserReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
