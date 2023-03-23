export default (state =[], action)=>{
    switch(action.type){
        case "TRACK":
            return action.payload
       
        default: return state    
    }
}