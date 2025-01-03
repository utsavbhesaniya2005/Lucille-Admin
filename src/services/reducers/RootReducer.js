import { combineReducers } from "redux";
import AlbumReducers from './AlbumReducers';
import AuthReducer from "./AuthReducer";

const RootReducer = combineReducers({
    AlbumReducers,
    AuthReducer
});

export default RootReducer;