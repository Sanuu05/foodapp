import axios from 'axios'
const port = "https://cautious-dog-swimsuit.cyclic.app"
// const port = "http://10.0.2.2:7777"
export const postProduct =(data)=> async(dispatch)=>{
    try {
        // alert('hello')
        const product = await axios.post(`${port}/product/post`, data)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})

    } catch (error) {
        console.log(error)
    }
}
export const getProduct =(data)=> async(dispatch)=>{
    try {
        const product = await axios.get(`${port}/product/get`)
        // console.log('cvcv',product)
        dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const delProduct =(id)=> async(dispatch)=>{
    try {
        console.log(id)
        const product = await axios.delete(`${port}/product/delete/${id}`)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const getoneProduct =(id)=> async(dispatch)=>{
    try {
        const product = await axios.get(`${port}/product/getitem/${id}`)
        dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const editProduct =(id,data)=> async(dispatch)=>{
    try {
        // console.log(id,data)
        const product = await axios.patch(`${port}/product/edit/${id}`,data)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
// query action 

export const postQuery =(data)=> async(dispatch)=>{
    try {
        const product = await axios.post(`${port}/query/post`, data)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const getQuery =(data)=> async(dispatch)=>{
    try {
        const product = await axios.get(`${port}/query/get`)
        dispatch({type:"FETCH_QUERY" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const delQuery =(id)=> async(dispatch)=>{
    try {
        // console.log(id)
        const product = await axios.delete(`${port}/query/delete/${id}`)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const postTop =(val)=> async(dispatch)=>{
    try {
        const product = await axios.post(`${port}/product/tproduct`, val)
        dispatch({type:"POST_TOP" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const getTop =(val)=> async(dispatch)=>{
    try {
        const product = await axios.get(`${port}/product/tproduct`)
        dispatch({type:"FETCH_TOP" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const delTop =(id)=> async(dispatch)=>{
    try {
        const product = await axios.delete(`${port}/product/tproduct/${id}`)
        dispatch({type:"DEL_TOP" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
