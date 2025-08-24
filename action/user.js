
import { NORMAL_LOADED, NORMAL_LOADING, NAUTH_ERROR, NLOGIN_SUCCESS, NLOGIN_FAIL, NLOGOUT_SUCESS, NREGISTER_SUCCESS, NREGISTER_FAIL,  GET_ERROR } from './types'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const port = "https://resturant-backend-f921.onrender.com"
// const port = "http://10.0.2.2:7777"

export const loadNormalUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: NORMAL_LOADING });
        console.log('loaduser')
        const token = await AsyncStorage.getItem('normaltoken');
        console.log("nor", token)
        const { data } = await Axios.get(`${port}/normal/getuser`, { headers: { "x-auth-token": token } })
        // console.log('tok', data)
        dispatch({ type: NORMAL_LOADED, payload: data })



    } catch (error) {
        dispatch({ type: NAUTH_ERROR })

    }
}
export const getalluser = () => async (dispatch) => {
    try {
        const { data } = await Axios.get(`${port}/normal/getalluser`)
        dispatch({ type: "GETALLUSER", payload: data })
        
    } catch (error) {

        // dispatch({ type: NREGISTER_FAIL })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const userNormalSign = (signdata) => async (dispatch) => {
    try {
        const { data } = await Axios.post(`${port}/normal/signup`, signdata)
        dispatch({ type: NREGISTER_SUCCESS, payload: data })
        alert('Signup Sucessfully')
        // window.location.reload()
        
    } catch (error) {
        console.log(error.response?.data?.msg)
        alert(error.response?.data?.msg)

        dispatch({ type: NREGISTER_FAIL })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const Nloguser = (dat) => async (dispatch) => {
    try {
        // console.log("login",dat)
        const { data } = await Axios.post(`${port}/normal/login`, dat)
        // console.log("login1",data)
        dispatch({ type: NLOGIN_SUCCESS, payload: data })
    } catch (error) {
        alert(error.response?.data?.msg)
        console.log("loginerr",error.response?.data?.msg)

        dispatch({ type: NLOGIN_FAIL })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const review = (dat) => async (dispatch,getState) => {
    try {
        const token = getState().normal.token;
        const { data } = await Axios.put(`${port}/comment`, dat, { headers: { "x-auth-token": token } })
        dispatch({ type: "REVIEW", payload: data })
    } catch (error) {

        // dispatch({ type: NLOGIN_FAIL })
        dispatch({ type: "REVIEW_ERROR", payload: error.response })
    }
}
export const updatereview = (dat) => async (dispatch,getState) => {
    try {
        console.log("update",dat)

    //     const token = getState().normal.token;
        const { data } = await Axios.patch(`${port}/updatecomment`, dat)
        dispatch({ type: "UPDATEREVIEW", payload: data })
    } catch (error) {

        // dispatch({ type: NLOGIN_FAIL })
        // dispatch({ type: "REVIEW_ERROR", payload: error.response })
    }
}
export const getorderlist = () => async (dispatch,getState) => {
    try {
        // console.log("update",dat)
console.log('getcart')

        const token = await AsyncStorage.getItem('normaltoken');
        console.log('ctok',token)
        const { data } = await Axios.get(`${port}/normal/orderitem`,{ headers: { "x-auth-token": token } })
    console.log('fgfg',data)
        dispatch({ type: "ORDERLIST", payload: data })
    } catch (error) {
        console.log('getcarterr')
        dispatch({ type: "ORDERLIST", payload: {buyitem:[]}})
        // dispatch({ type: NLOGIN_FAIL })
        // dispatch({ type: "REVIEW_ERROR", payload: error.response })
    }
}
export const addtocart = (cart) => async (dispatch) => {
    try {
        // console.log("vv",cart)
        const token = await AsyncStorage.getItem('normaltoken');
        const { data } = await Axios.post(`${port}/cart/post`, cart ,{ headers: { "x-auth-token": token } })
        // console.log('jj',data)
        dispatch ({type:"ADDDATA" , payload:data})
        
        
    } catch (error) {

        
    }
}
export const getcart = ()=>async(dispatch) =>{
    try {
        console.log('vvvmmm')
        const token = await AsyncStorage.getItem('normaltoken');
        console.log("norbb", token)
        const { data } = await Axios.get(`${port}/cart/get`, { headers: { "x-auth-token": token } })
        console.log("cartdd",data)
        dispatch({type:"ADD_CART" , payload : data})
    } catch (error) {
        const data = [{cart:null}]
        dispatch({type:"ADD_CART" , payload : data})
        console.log('err')
        
    }
}
export const addcategory = (dataa)=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.post(`${port}/category`,dataa)
        dispatch({type:"ADDCATEGORY" , payload : data})
    } catch (error) {
        
    }
}
export const getcategory = ()=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.get(`${port}/category`)
        dispatch({type:"CATEGORY" , payload : data})
    } catch (error) {
        
    }
}
export const getorder = ()=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.get(`${port}/normal/order`)
        // console.log("data",data)
        dispatch({type:"ORDER" , payload : data})
    } catch (error) {
        
    }
}
export const trackorder = (id)=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.get(`${port}/normal/trackorder/${id}`)
        console.log("data",data)
        dispatch({type:"TRACK" , payload : data})
    } catch (error) {
        
    }
}
export const orderedit = (body,id)=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        console.log(body)
        const { data } = await Axios.patch(`${port}/normal/orderedit/${id}`,body)
        // console.log("data",data)
        dispatch({type:"DELORDER" , payload : data})
    } catch (error) {
        
    }
}
export const delorder = (id)=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        console.log(id)
        const { data } = await Axios.delete(`${port}/normal/order/${id}`)
        // console.log("data",data)
        dispatch({type:"DELORDER" , payload : data})
    } catch (error) {
        
    }
}
export const delcategory = (id)=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        console.log(id)
        const { data } = await Axios.delete(`${port}/category/${id}`)
        dispatch({type:"DELCATEGORY" , payload : data})
    } catch (error) {
        
    }
}
export const delCart = (id) =>async (dispatch)=>{
    try {
        console.log("del",id)
        const token = await AsyncStorage.getItem('normaltoken');
        const { data } = await Axios.delete(`${port}/cart/del/${id}`, { headers: { "x-auth-token": token } })
        dispatch({type:"DELETE_CART", payload:data})
        dispatch({type:"DEL_CART", payload:data})
    } catch (error) {
        console.log(error)
    }
}
export const deleted = () =>async (dispatch)=>{
    try {
        // console.log("del",id)
        const token = await AsyncStorage.getItem('normaltoken');
        const { data } = await Axios.delete(`${port}/cart/delete`, { headers: { "x-auth-token": token } })
        dispatch({type:"CART_DEL" , payload:data})
        dispatch({type:"DELETE_ALL"})
        
    } catch (error) {
        console.log(error)
    }
}

export const nlogout = () => async (dispatch) => {
    // alert('hello')
    dispatch({ type: NLOGOUT_SUCESS })
    // window.location.reload()

}

