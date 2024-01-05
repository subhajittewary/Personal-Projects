import {
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from '../constants/userConstants'

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST: {
            return {
                ...state, loading: true
            }
        }
        case USER_LIST_SUCCESS: {
            return {
                userList: action.payload,
                loading: false
            }
        }
        case USER_LIST_FAIL: {
            return {
                error: action.payload,
                loading: false
            }
        }
        default: {
            return state
        }
    }
}

export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST: {
            return {
                ...state, loading: true
            }
        }
        case USER_DELETE_SUCCESS: {
            return {
                message: action.payload,
                loading: false,
                success: true
            }
        }
        case USER_DELETE_FAIL: {
            return {
                error: action.payload,
                loading: false
            }
        }
        default: {
            return state
        }
    }
}

export const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST: {
            return {
                ...state, loading: true
            }
        }
        case USER_PROFILE_SUCCESS: {
            return {
                user: action.payload,
                loading: false,
                success: true
            }
        }
        case USER_PROFILE_FAIL: {
            return {
                error: action.payload,
                loading: false
            }
        }
        default: {
            return state
        }
    }
}

export const updateUserReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }

        case USER_UPDATE_SUCCESS: {
            return {
                data: action.payload,
                loading: false,
                success: true
            }
        }

        case USER_UPDATE_FAIL: {
            return {
                error: action.payload,
                loading: false
            }
        }

        default: {
            return state
        }
    }
}

