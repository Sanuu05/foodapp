export default (state =[], action)=>{
    switch(action.type){
        case "EDIT_PRODUCT":
            return action.payload.data
       
        default: return state    
    }
}