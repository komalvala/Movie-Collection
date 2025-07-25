const initialState = {
    movies: [],
    movie: null,
    isLoading: false,
    isCreate: false,
    isUpdate: false,
    errMSG: ""
}

const movieReducer = (state = initialState, action)=>{
    switch (action.type) {
         case "LOADING": 
                return {
                    ...state,
                    isLoading: true,
                }
        case "ERROR":
                return {
                    ...state,
                    isLoading: false,
                    errMSG: action.payload
                }        
        case "ADD_MOVIE":
            return{
                ...state,
                isCreate: true
            };

        case "GET_ALL_MOVIE":
            return{
                movies: action.payload,
                isLoading: false,
                isCreate: false,
                isUpdate: false,
                errMSG: ""
            }

        // case "DELETE_MOVIE":
        //         let getdata = JSON.parse(localStorage.getItem("Movies"))
        //         let updateData = getdata.filter(mov => mov.id != action.payload)
        //         localStorage.setItem("Movies", JSON.stringify(updateData));
        //         return {
        //             ...state,
        //             movies: updateData
        //         }

        case "GET_SINGLE_MOVIE":
                return {
                    ...state,
                    movie: action.payload
                } 

        case "UPDATE_MOVIE":
                return {
                    ...state,
                    movie: null,
                    isUpdate: true
                }
            default:
                return state;
        
    }
    
}

export default movieReducer;
