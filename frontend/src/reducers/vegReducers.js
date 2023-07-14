import{
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/vegConstants.js'


export const vegListReducer = (state={vegies:[]},action)=>{
    switch (action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading :true,vegies:[]}
        case PRODUCT_LIST_SUCCESS:
            return {loading : false,vegies: action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading : false,error: action.payload} 
        default:
            return state
    }
}

export const vegDetailsReducer = (state={veg : {reviews : []}},action)=>{
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading :true,...state}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading : false,veg: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading : false,error: action.payload} 
        default:
            return state
    }
}