import { AUTH } from "../actions/Auth";

const  initialState  = {
    auth : null
}

export const Reducers = (state = initialState , action) =>{
  
    switch (action.type) {
        case AUTH : {
           
            return {...state, auth : action.payload}
        }
        default: 
            return initialState;
        
    }     
}

