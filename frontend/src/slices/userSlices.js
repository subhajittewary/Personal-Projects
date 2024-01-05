import { createSlice } from '@reduxjs/toolkit'
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    userDetails: { loading: false },
    usersList: {loading: false , users:[], error: {}}
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoginReq: (state) => {
            state.userLogin.loading = true;
        },
        userLoginSuccess: (state, action) => {
            state.userLogin.loading = false;
            state.userLogin.userInfo = action.payload;
        },
        userLoginFail: (state, action) => {
            state.userLogin.loading = false;
            state.userLogin.error = action.payload;
        },
        userLogout: (state) => {
            state.userLogin = {}
        },
        userDetailsReq: (state) => {
            state.userDetails.loading = true;
        },
        userDetailsSuccess: (state, action) => {
            console.log("payload", action.payload);
            state.userDetails.loading = false;
            state.userDetails.user = action.payload;
        },
        userDetailsFail: (state, action) => {
            state.userDetails.loading = false;
            state.userDetails.error = action.payload;
        },
        userDetailsReset: (state) => {
            state.userDetails.user = {};
        },
        usersListReq: (state) => {
            state.usersList.loading = true;
        },
        usersListSuccess: (state, action) => {
            console.log("payload", action.payload);
            state.usersList.loading = false;
            state.usersList.users = action.payload;
        },
        usersListFail: (state, action) => {
            state.usersList.loading = false;
            state.usersList.error = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const { userLoginReq, userLoginSuccess, userLoginFail, userLogout, userDetailsReq, userDetailsSuccess, userDetailsFail, userDetailsReset, usersListReq, usersListSuccess, usersListFail } = userSlice.actions;

export default userSlice.reducer;