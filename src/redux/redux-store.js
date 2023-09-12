import { applyMiddleware, combineReducers, createStore } from "redux";
import headerReducer from "./headerReducer";
import resultReducer from "./resultReducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    header: headerReducer,
    searchResult: resultReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;