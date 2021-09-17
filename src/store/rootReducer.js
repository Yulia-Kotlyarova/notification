import { combineReducers } from "@reduxjs/toolkit";
import notice from './notice';

const rootReducer = combineReducers({
    notice,
});

export default rootReducer;
