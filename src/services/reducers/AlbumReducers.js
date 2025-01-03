const initialState = {
    albums : [],
    album : null,
    isAlbumCreate : false,
    albumErr : null
}

const AlbumReducers = (state = initialState, action) => {

    switch(action.type){

        case 'ADD_ALBUM_SUC' :
            return{
                ...state,
                albumErr : null,
                isAlbumCreate : true
            }

        case 'ADD_ALBUM_REJ' : 
            return{
                ...state,
                albumErr : action.payload,
                isAlbumCreate : false
            }

        case 'GET_ALBUMS_SUC' :
            return{
                ...state,
                albums : action.payload,
                albumErr : null
            }

        case 'GET_ALBUMS_REJ' :
            return{
                ...state,
                albumErr : action.payload
            }

        case 'FIND_ALBUM_SUC' :
            return{
                ...state,
                album : action.payload,
                albumErr : null
            }

        case 'UPDATE_ALBUM_SUC' :
            return{
                ...state,
                album : action.payload,
                albumErr : null
            }

        case 'UPDATE_ALBUM_REJ' :
            return{
                ...state,
                album : null,
                albumErr : action.payload
            }

        case 'DELETE_ALBUM_SUC' : 
            return{
                ...state,
                albumErr : null
            }

        case 'DELETE_ALBUM_REJ' :
            return{
                ...state,
                albumErr : action.payload
            }

        default :
            return state;

    }

}
export default AlbumReducers;