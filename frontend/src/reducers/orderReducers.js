import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_RESET
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST: {
            return {
                loading: true
            }
        }
        case ORDER_CREATE_SUCCESS: {
            return {
                loading: false,
                order: action.payload,
                success: true
            }
        }
        case ORDER_CREATE_FAIL: {
            return {
                loading: false,
                error: action.payload,
                success: false
            }
        }
        default:
            return state

    }

}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case ORDER_DETAILS_SUCCESS: {
            return {
                loading: false,
                order: action.payload,
                success: true
            }
        }
        case ORDER_DETAILS_FAIL: {
            return {
                loading: false,
                error: action.payload,
                success: false
            }
        }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST: {
            return {
                loading: true
            }
        }
        case ORDER_PAY_SUCCESS: {
            return {
                loading: false,
                success: true
            }
        }
        case ORDER_PAY_FAIL: {
            return {
                loading: false,
                error: action.payload,
                success: false
            }
        }
        case ORDER_PAY_RESET: {
            return {}
        }
        default:
            return state
    }
}

export const myOrdersReducer = (state = {}, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case MY_ORDERS_SUCCESS: {
            return {
                loading: false,
                orderList: action.payload,
                success: true
            }
        }
        case MY_ORDERS_FAIL: {
            return {
                loading: false,
                error: action.payload,
                success: false
            }
        }
        case MY_ORDERS_RESET: {
            return {
                orderList: []
            }
        }
        default:
            return state
    }
}