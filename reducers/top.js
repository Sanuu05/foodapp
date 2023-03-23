export default (state =[], action)=>{
    switch(action.type){
        case "FETCH_TOP":
            return action.payload.data
       
        default: return state    
    }
}