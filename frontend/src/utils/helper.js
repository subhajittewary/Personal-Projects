import store from "../store";
// Get the current state of the store

const state = store.getState();

export const getAuthorizationToken = () => {
    const {
        userLogin: {userInfo},
      } = state.userSlice;
      return userInfo?.token;
}

