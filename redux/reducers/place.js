const places = function(state = {
    current: null,
    places: [],
    detail: {
        data: null,
        bool: false,
      },
    marker: null
}, action){
    switch (action.type){
        case "LOCATION": 
           return state = {
               ...state,
               current: action.current,
            };
        break;
        case "PLACES":
        return state = {
            ...state,
            places: action.places,            
        };
        break;
        case "DETAIL":
        return state = {
            ...state,
            detail: action.data,            
        };
        break;
        case "MARK":
        return state = {
            ...state,
            marker: action.marker,
        }
        break;
        case "SIGN_OUT":
        return state = {
            ...state,
            detail: {
                data: null,
                bool: false,
            },
        }
        break;        
        default:
            return state;
        break;
    }    
}

export default places;