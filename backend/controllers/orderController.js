import express from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

const router = express.Router()

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingPrice,
        shippingAddress,
        paymentMethod,
        taxPrice,
        totalPrice
    } = req.body
    if (orderItems && orderItems.length == 0) {
        res.status(400)
        throw new Error('No order items')
        return
    }

    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingPrice,
        shippingAddress,
        paymentMethod,
        taxPrice,
        totalPrice
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const orderItem = await Order.findById(id).populate('user', 'name email')
    if (!orderItem) {
        res.status(400)
        throw new Error('No order found')
        return
    }

    res.status(200).json(orderItem)
})


// @desc    update order for pay by ID
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const orderItem = await Order.findById(req.params.id)
    if (orderItem) {
        orderItem.isPaid = true
        orderItem.paidOn = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await orderItem.save()
        res.status(200).json(updatedOrder)
        return
    } else {
        res.status(400)
        throw new Error('No order found')
        return
    }
})

// @desc    get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    if (orders) {
        res.json(orders)
        return
    } else {
        res.status(400)
        throw new Error('No order found')
        return
    }
})

// @desc    get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ })
    if (orders) {
        res.json(orders)
        return
    } else {
        res.status(400)
        throw new Error('No order found')
        return
    }
})

