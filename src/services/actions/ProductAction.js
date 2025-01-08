import { collection, addDoc, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

const addProductSuc = () => {

    return{
        type : 'ADD_PRODUCT_SUC'
    }
}

const addProductRej = (err) => {

    return{
        type : 'ADD_PRODUCT_REJ',
        payload : err
    }
}

const getProductSuc = (data) => {

    return{
        type : 'GET_PRODUCTS_SUC',
        payload : data
    }
}

const getProductRej = (err) => {

    return{
        type : 'GET_PRODUCTS_REJ',
        payload : err
    }
}

const findProductSuc = (product) => {

    return{
        type : 'FIND_PRODUCT_SUC',
        payload : product
    }
}

const updateProductSuc = (product) => {

    return{
        type : 'UPDATE_PRODUCT_SUC',
        payload : product
    }
}

const updateProductRej = (err) => {

    return{
        type : 'UPDATE_PRODUCT_REJ',
        payload : err
    }
}

const deleteProductSuc = () => {

    return{
        type : 'DELETE_PRODUCT_SUC'
    }
}

const deleteProductRej = (err) => {

    return{
        type : 'DELETE_PRODUCT_REJ',
        payload : err
    }
}

const getOrdersSuc = (orders) => {

    return{
        type : 'GET_ORDERS_SUC',
        payload : orders
    }
}

const getOrdersRej = (err) => {

    return{
        type : 'GET_ORDERS_REJ',
        payload : err
    }
}

export const addProductAsync = (data) => {

    return async dispatch => {

        try{

            
            await addDoc(collection(db, "products"), data);

            dispatch(addProductSuc());
        }catch(err){

            dispatch(addProductRej(err.code))            
        }

    }
} 

export const getProductAsync = () => {

    return async dispatch => {

        try{
            
            const adminLoginId = JSON.parse(localStorage.getItem('loginId'));

            let getdata = await getDocs(collection(db, 'products'));

            let products = [];

            getdata.forEach((doc) => {
                
                if(adminLoginId === doc.data().adminId){

                    let productData = doc.data();
                    productData.id = doc.id;
                    products.push(productData);
                }
            }); 

            dispatch(getProductSuc(products));

        }catch(err){

            dispatch(getProductRej(err.code));
        }
        
    }
}

export const findProductsAsync = (id) => {

    return async dispatch => {

        try{

            let findRec = await getDoc(doc(db, 'products', `${id}`));
            let getData = findRec.data();
            getData.id = findRec.id;

            console.log("Get",getData);

            dispatch(findProductSuc(getData));
        }catch(err){
            
            console.log(err);
        }
        
    }
}   

export const updateProductAsync = (data) => {

    return async dispatch => {

        try{

            let updateRec = await setDoc(doc(db, "products", `${data.id}`), data);
            dispatch(updateProductSuc(updateRec));
        }catch(err){

            dispatch(updateProductRej(err.code));
        }
    }
}

export const deleteProductAsync = (id) => {

    return async dispatch => {

        try{

            await deleteDoc(doc(db, 'products', `${id}`));
            dispatch(deleteProductSuc());
        }catch(err){

            dispatch(deleteProductRej(err.code))
        }
    }
}

export const getOrdersAsync = () => {

    return async dispatch => {

        try{

            const adminLoginId = JSON.parse(localStorage.getItem('loginId'));

            let getOrder = await getDocs(collection(db, 'orders'));

            let orders = [];

            getOrder.forEach((res) => {
                
                if(adminLoginId === res.data().adminId){

                    let allOrders = res.data();
                    allOrders.id = doc.id;
                    orders.push(allOrders);
                }
            });

            dispatch(getOrdersSuc(orders));
            
        }catch(err){
            
            dispatch(getOrdersRej(err.message))
        }

    }
}