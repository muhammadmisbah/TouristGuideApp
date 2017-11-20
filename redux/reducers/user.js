const user= function(state = {
    user: {
    displayName: '',
    email: '',
    password: '',
},
 data: false
}
, action){
    switch (action.type){
        case "SIGN_IN": 
           return state = 
           {user: action.user,
            data: action.data};
        break;

        case "SIGN_UP":
           return state = 
           {user: action.user,
            data: action.data};
        break;

        case "SIGN_OUT":
           return state = {
                user: {
                    displayName: '',
                    email: '',
                    password: '',
                },
                data: false
            }
        break;
        
        default:
            return state;
        break;
    }    
}

export default user;