const initialState = {
    products : [],
    orders : [],
    product : null,
    isProductCreate : false,
    productErr : null
}

const ProductReducers = (state = initialState, action) => {

    switch(action.type){

        case 'ADD_PRODUCT_SUC' :
            return{
                ...state,
                productErr : null,
                isProductCreate : true
            }

        case 'ADD_PRODUCT_REJ' : 
            return{
                ...state,
                productErr : action.payload,
                isProductCreate : false
            }

        case 'GET_PRODUCTS_SUC' :
            return{
                ...state,
                products : action.payload,
                productErr : null
            }

        case 'GET_PRODUCTS_REJ' :
            return{
                ...state,
                productErr : action.payload
            }

        case 'FIND_PRODUCT_SUC' :
            return{
                ...state,
                product : action.payload,
                productErr : null
            }

        case 'UPDATE_PRODUCT_SUC' :
            return{
                ...state,
                product : action.payload,
                productErr : null
            }

        case 'UPDATE_PRODUCT_REJ' :
            return{
                ...state,
                product : null,
                productErr : action.payload
            }

        case 'DELETE_PRODUCT_SUC' : 
            return{
                ...state,
                productErr : null
            }

        case 'DELETE_PRODUCT_REJ' :
            return{
                ...state,
                productErr : action.payload
            }

        case 'GET_ORDERS_SUC' :
            return{
                ...state,
                orders : action.payload,
                productErr : null
            }

        case 'GET_ORDERS_REJ' :
            return{
                ...state,
                orders : [],
                productErr : action.payload
            }

        default :
            return state;

    }

}
export default ProductReducers;