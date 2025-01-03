import { collection, addDoc, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

const addAlbumSuc = () => {

    return{
        type : 'ADD_ALBUM_SUC'
    }
}

const addAlbumRej = (err) => {

    return{
        type : 'ADD_ALBUM_REJ',
        payload : err
    }
}

const getAlbumSuc = (data) => {

    return{
        type : 'GET_ALBUMS_SUC',
        payload : data
    }
}

const getAlbumRej = (err) => {

    return{
        type : 'GET_ALBUMS_REJ',
        payload : err
    }
}

const findAlbumSuc = (album) => {

    return{
        type : 'FIND_ALBUM_SUC',
        payload : album
    }
}

const updateAlbumSuc = (album) => {

    return{
        type : 'UPDATE_ALBUM_SUC',
        payload : album
    }
}

const updateAlbumRej = (err) => {

    return{
        type : 'UPDATE_ALBUM_REJ',
        payload : err
    }
}

const deleteAlbumSuc = () => {

    return{
        type : 'DELETE_ALBUM_SUC'
    }
}

const deleteAlbumRej = (err) => {

    return{
        type : 'DELETE_ALBUM_REJ',
        payload : err
    }
}

export const addAlbumAsync = (data) => {

    return async dispatch => {

        try{

            await addDoc(collection(db, "albums"), data);

            dispatch(addAlbumSuc());
        }catch(err){

            dispatch(addAlbumRej(err.code))            
        }

    }
} 

export const getAlbumAsync = () => {

    return async dispatch => {

        try{

            let getdata = await getDocs(collection(db, 'albums'));

            let albums = [];

            getdata.forEach((doc) => {
                
                let albumData = doc.data();
                albumData.id = doc.id;
                albums.push(albumData);
            }); 

            dispatch(getAlbumSuc(albums));

        }catch(err){

            dispatch(getAlbumRej(err.code));
        }
        
    }
}

export const findAlbumsAsync = (id) => {

    return async dispatch => {

        try{

            let findRec = await getDoc(doc(db, 'albums', `${id}`));
            let getData = findRec.data();
            getData.id = findRec.id;

            console.log("Get",getData);
            

            dispatch(findAlbumSuc(getData));
        }catch(err){
            
            console.log(err);
        }
        
    }
}   

export const updateAlbumAsync = (data) => {

    return async dispatch => {

        try{

            let updateRec = await setDoc(doc(db, "albums", `${data.id}`), data);
            dispatch(updateAlbumSuc(updateRec));
        }catch(err){

            dispatch(updateAlbumRej(err.code));
        }
    }
}

export const deleteAlbumAsync = (id) => {

    return async dispatch => {

        try{

            await deleteDoc(doc(db, 'albums', `${id}`));
            dispatch(deleteAlbumSuc());
        }catch(err){

            dispatch(deleteAlbumRej(err.code))
        }
    }
}