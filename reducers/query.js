export default (state =[], action)=>{
    switch(action.type){
        case "FETCH_QUERY":
            return action.payload.data
       
        default: return state    
    }
}