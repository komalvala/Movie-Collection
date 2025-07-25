import { combineReducers } from "redux";
import movieReducer from '../Reducers/movieReducers';

export const rootReducer = combineReducers({
    movieReducer,
})