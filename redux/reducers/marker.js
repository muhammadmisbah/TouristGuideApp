const marker = function(state = {
    details: null,
    fetchDetails: false,
}, action){
    switch (action.type){
        case "MARKER": 
           return state = action.region;
        break;
        case "SIGN_OUT":
            return state = {
                details: null,
                fetchDetails: false,
            };
        break;
        case "CLAER":
            return state = {
                details: null,
                fetchDetails: false,
            }
        break;
        default:
            return state;
        break;
    }    
}

export default marker;