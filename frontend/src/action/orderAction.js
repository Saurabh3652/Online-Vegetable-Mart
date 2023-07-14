import { ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL } from "../constants/orderConstants";
import axios from "axios"

export const createOrder=(order)=> async (dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_CREATE_REQUEST
        })
    
        const {userLogin : {userInfo}} =getState()
        const token = userInfo.token
        console.log("order is")
        console.log(order)
        console.log("token is")
        console.log(token)
        const config ={
            headers:{
                'Content-Type' : 'application/json',
                Authorization:`Bearer ${token}`
            },
        }
        // console.log(Authorization)
        const orderJSON = JSON.stringify(order);
        const {data} = await axios.post(`/api/orders`,orderJSON,
            config
        )
        console.log("data is ")
        console.log(data)
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
    
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}

export const getOrderDetails = (param) => async (dispatch, getState) => {
    console.log("id is")
    console.log(param.id)
    const id = param.id;
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/orders/${id}`, config)
  
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        console.log("yoyoyo")
      }
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: message,
      })
    }
  }


  export const payOrder= (orderId,paymentResult) => async (dispatch, getState) => {
    console.log("order is")
    console.log(orderId)
    // const id = order.id;
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult, config)
  
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        console.log("yoyoyo")
      }
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      })
    }
  }

  export const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_MY_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/orders/myorders`, config)
  
      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        // dispatch(logout())
        console.log(message)
      }
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: message,
      })
    }
  } 
  