const initialState = {
    admins : [],
    isCreate : false,
    isSignUpErr : null,
    admin : null,
    isSignIn : false,
    isSignInErr : null,
}

const AuthReducer = (state = initialState, action) => {

    switch(action.type){

        case 'SIGNUP_SUC' :
            
            return {
                ...state, 
                isCreate : true,
                isSignIn : false,
                admins : action.payload
            }

        case 'SIGNUP_REJ' :

            return {
                ...state,
                isSignUpErr : action.payload,
                isSignIn : false
            }   

        case 'SIGNIN_SUC' :

            return {
                ...state, 
                isSignIn : true,
                admin : action.payload
            }

        case 'SIGNIN_REJ' :

            return{

                ...state,
                isSignInErr : action.payload
            }

        case 'RESET_SIGNUP_ERR' :

            return{
                ...state,
                isSignUpErr : null,
                isSignIn : false
            }

        case 'RESET_SIGNIN_ERR' :

            return{
                ...state,
                isSignInErr : null,
                isSignIn : false
            }

        case 'SIGNOUT' :

            return{
                ...state,
                admin : null,
                isSignIn : false
            }

        case 'GET_ADMINS' :

            return {
                ...state,
                admins : action.payload
            }

        default : 
            return state    

    }

}
export default AuthReducer;