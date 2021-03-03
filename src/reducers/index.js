import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import searchStringReducer from "./searchStringReducer";

const persistConfig = {
  key: "searchTerms",
  storage,
  whitelist: ["searchStringReducer"],
};
const reducer = combineReducers({
  userReducer,
  searchStringReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { persistor, store };
