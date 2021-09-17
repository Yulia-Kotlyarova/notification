import {  createSlice } from "@reduxjs/toolkit";

export const initialState = {
    noticeData: [],
};

export const noticesModule = createSlice({
    name: "notice",
    initialState,
    reducers: {
        setNewNotice(state, { payload }) {
            state.noticeData = [...state.noticeData, payload];
        },
        removeData(state) {
            state.noticeData = [];
        },
        setReaded(state) {
            state.noticeData.forEach(i => i.readed = true);
        }
    },
});
// * mutations
export const { removeData, setNewNotice, setReaded } = noticesModule.actions;

export default noticesModule.reducer;
