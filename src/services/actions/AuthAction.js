import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db, provider } from "../../firebaseConfig";

export const adminSignUpSuc = (admins) => {

    return{
        type : 'SIGNUP_SUC',
        payload : admins
    }
}

export const adminSignUpRej = (errMsg) => {

    return{
        type : 'SIGNUP_REJ',
        payload : errMsg
    }
}

export const adminSignInRej = (errMsg) => {

    return{
        type : 'SIGNIN_REJ',
        payload : errMsg
    }
}

export const adminSignInSuc = (admin) => {

    return{
        type : 'SIGNIN_SUC',
        payload : admin
    }
}

export const resetSignUpErr = () => {
    return{
        type : 'RESET_SIGNUP_ERR'
    }
}

export const resetSignInErr = () => {
    return{
        type : 'RESET_SIGNIN_ERR'
    }
}

export const adminLogout = () => {

    return{
        type : 'SIGNOUT'
    }
}

export const getAdminsSuc = (admins) => {

    return{
        type : 'GET_ADMINS',
        payload : admins
    }
}

export const getAdmins = () => {

    return async dispatch => {

        try{

            let getData = (await getDocs(collection(db, 'admins'))).docs.map(doc => ({...doc.data(), uid : doc.id }));         

            dispatch(getAdminsSuc(getData));
        }catch(err){

            console.log(err);
        }
    }
}

export const signUpAsync = (admins) => {

    return async dispatch => {

        createUserWithEmailAndPassword(auth, admins.email, admins.pass)
        .then((adminCred) => {
            
            adminCred.user.displayName = admins.uname;
            
            const signUpAdmin = {
                uid : adminCred.user.uid,
                uname : adminCred.user.displayName,
                email : adminCred.user.email
            }
            
            addDoc(collection(db, 'admins'), signUpAdmin);

            console.log("Addmin Added");
            

            dispatch(adminSignUpSuc(signUpAdmin));
        })
        .catch((err) => {
            
            console.log(err.code);
            
            if(err.code == 'auth/email-already-in-use'){
                
                dispatch(adminSignUpRej('User Already Exits.'));
            }
        })

    }

}

export const signInAsync = (admin) => {

    return async dispatch => {

        signInWithEmailAndPassword(auth, admin.email, admin.pass)
        .then((res) => {

            let signInAdmin = {
                uid : res.user.uid,
                email : res.user.email,
                uname : res.user.displayName
            };

            localStorage.setItem('loginId', JSON.stringify(signInAdmin.uid));

            dispatch(adminSignInSuc(signInAdmin))
        })
        .catch((err) => {

            console.log(err);

            if(err.code == 'auth/invalid-credential'){
                
                dispatch(adminSignInRej('Username Or Password Is Invalid.'));
            }
        })
    }

}

export const signInWithGoogle = () => {

    return async dispatch => {

        try{

            const res = await signInWithPopup(auth, provider);

            const adminData = {
                uid: res.user.uid,
                email: res.user.email,
                displayName: res.user.displayName,
                photoURL: res.user.photoURL
            }

            const getAdmin = await getDocs(collection(db, 'admins'));

            const adminExist = getAdmin.docs.some(doc => doc.data().uid === adminData.uid);
            
            if(!adminExist){

                await addDoc(collection(db, "admins"), adminData);
            }
            
            localStorage.setItem('loginId', JSON.stringify(adminData.uid));

            dispatch(adminSignInSuc(res.user));

        }catch(err){

            console.log(err);
        }
    }
}

export const getAdminId = () => {

    return async dispatch => {

        try{

            let getLoginId = JSON.parse(localStorage.getItem('loginId'));

            let getAdmin = await getDocs(collection(db, 'admins'));

            getAdmin.forEach((res) => {
                if(res.data().uid === getLoginId){

                    dispatch(adminSignInSuc(res.data()));
                }
            })

        }catch(err){

            console.log(err);
        }
    }
}

export const adminLogoutAsync = () => {

    return async dispatch => {

        try{
            
            await signOut(auth);
            localStorage.removeItem('loginId');
            dispatch(adminLogout());
        }catch(err){
            
            console.log(err);
        }
        
    }
}