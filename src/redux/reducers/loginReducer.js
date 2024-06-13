const initialState={
    token:localStorage.getItem('token')||""
}


const loginReducer=(state=initialState,action)=>{
    switch(action.type){
        case "LOGIN":
            return({
                token:action.payload
            })

        case "LOGOUT":
            localStorage.removeItem('token')
            return({
                token:""
            })    

        default:
            return state
    }
}

export default loginReducer