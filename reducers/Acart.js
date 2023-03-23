const initial ={
    del:[],
    add:[],
    post:[],
    payment:[],
    cdel:[],
    category:[],
    addcategory:[],
    delcategory:[],
    order:[],
    delorder:[],
    ncreate:[]
    
}
export default (state =initial, action)=>{
    switch(action.type){
        case "DEL_CART":
            console.log('delc')
            return{ del: action.payload
            }
        case "ADDDATA":{
            return{
                add:action.payload
            }
        }
        case "CREATE":{
            return{
                post:action.payload
            }
        }
        case "PAYMENT":{
            return{
                payment:action.payload
            }
        }
        case "CART_DEL":{
            return{
                cdel:action.payload
            }
        }
        case "CATEGORYa":{
            return{
                category:action.payload
            }
        }
        case "ADDCATEGORY":{
            return{
                addcategory:action.payload
            }
        }
        case "DELCATEGORY":{
            return{
                delcategory:action.payload
            }
        }
        case "ORDER":{
            return{
                order:action.payload
            }
        }
        case "DELORDER":{
            return{
                delorder:action.payload
            }
        }
        case "NCREATE":{
            return{
                ncreate:action.payload
            }
        }
        default: return state    
    }
}