import {combineReducers} from 'redux';
import product from './product'
import edit from './editproduct'
import query from './query'
import top from './top'
import refresh from './refresh'
import acart from './Acart'
// import top from './top'
// import refresh from './refresh'
import addcat from './addcat'
import normal from './normal'
import cart from './cart'
import orderlist from './orderlist'
import track from './track';
export default combineReducers({
    product,
    edit,
    query,
    top,
    refresh,
    acart,
    normal,
    addcat,
    cart,
    orderlist,
    track


})