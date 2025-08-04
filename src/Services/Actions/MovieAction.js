import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebaseConfig"

export const addMovie = () => {
    return {
        type: "ADD_MOVIE"
    }
}

export const getAllMovies = (data) => {
    return {
        type: "GET_ALL_MOVIE",
        payload: data
    }
}

export const deleteMovie = (id) => {
    return {
        type: "DELETE_MOVIE",
        payload: id
    }
}

export const getSingleMovie = (data) => {
    return {
        type: "GET_SINGLE_MOVIE",
        payload: data
    }
}

export const updateMovie = () => {
    return {
        type: "UPDATE_MOVIE"
    }
}

export const loading = () => {
    return {
        type: "LOADING",
    }
}

export const errorMessage = (err) => {
    return {
        type: "ERROR",
        payload: err
    }
}

// Async Action

export const getAllMoviesAsync = () => {
    return async (dispatch) => {
        dispatch(loading());
       try {
        let result =[];
        let res =await getDocs(collection(db, "movies"));
        res.forEach((doc) => {  
            result.push(doc.data());
        });
                dispatch(getAllMovies(result))
       } catch (error) {
            console.log(error)
            dispatch(errorMessage(error.message))
       }
    }   
}

export const AddMoviesAsync = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await setDoc(doc(db, "movies", data.id), data);
            dispatch(addMovie());
        } catch (error) {
            console.log(error)
            dispatch(errorMessage(error.message))
        }
        
    }   
}

export const deleteMoviesAsync = (id) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await deleteDoc(doc(db, "movies", id));
            dispatch(getAllMoviesAsync());
        } catch (error) {
            console.log(error)
            dispatch(errorMessage(error.message))
        }       
    }   
}

export const getSingleMovieAsync = (id) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let res = await getDoc(doc(db, "movies", id));
            if (res.data()) {
                dispatch(getSingleMovie(res.data()));
            }
        } catch (error) {
            console.log(error)
            dispatch(errorMessage(error.message))
        }      
    }   
}

export const updateMovieAsync = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await updateDoc(doc(db, "movies", data.id), data);
            dispatch(updateMovie());
        } catch (error) {
            console.log(error)
            dispatch(errorMessage(error.message))
        }        
    }   
}