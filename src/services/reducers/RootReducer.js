import { combineReducers } from "redux";
import AlbumReducers from './AlbumReducers';
import AuthReducer from "./AuthReducer";
import ProductReducers from "./ProductReducers";

const RootReducer = combineReducers({
    AlbumReducers,
    AuthReducer,
    ProductReducers
});

export default RootReducer;