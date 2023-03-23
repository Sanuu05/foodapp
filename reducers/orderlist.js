export default (state =[], action)=>{
    switch(action.type){
        case "ORDERLIST":
            return action.payload.buyitem
       
        default: return state    
    }
}