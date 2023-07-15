import { legacy_createStore as createStore } from 'redux';
import {combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { vegListReducer,vegDetailsReducer } from './reducers/vegReducers.js'
import {composeWithDevTools} from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducer.js';
import { userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer,userListReducer, userDeleteReducer} from './reducers/userReducer.js';
import { orderCreateReducer,orderDetailsReducer, orderPayReducer,orderListMyReducer} from './reducers/orderReducer.js';

const cartItemsFromStorage = localStorage.getItem('cartItems') ?  JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?  JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?  JSON.parse(localStorage.getItem('shippingAddress')) : {}

const reducer = combineReducers({
    userLogin:userLoginReducer,
    vegList:vegListReducer,
    vegDetail:vegDetailsReducer,
    cart:cartReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList: userListReducer,
    userDelete:userDeleteReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer

})

const middleware = [thunk] 
const initialState ={
    cart: {cartItems:cartItemsFromStorage,shippingAddressFromStorage},
    userLogin: {userInfo:userInfoFromStorage}
}
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store