// import { useDispatch } from 'react-redux'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { sendmessage } from './actions'





const changereducer = (state = {id : '',amount : 0,language : 'Eng',timer : false,bookname : '',Login : false,message : ''},action) => {
if(action.type === 'Eng'){
     return { 
         amount : state.amount,
         language: state.language,
         timer : state.timer,
         bookname : state.bookname,
         id : state.id,
         message : ''
     }
}
if(action.type === 'Hindi'){
    return { 
        amount : state.amount,
        language: 'Hindi',
        timer : state.timer,
        bookname : state.bookname,
        id : state.id,
        message : ''
    }
}
if(action.type === 'Add'){
    return{
        language : state.language,
        amount: state.amount+action.payload.price,
        timer : state.timer,
        bookname : action.payload.bookname,
        id : action.payload.id,
        message : ''
    }
}
if(action.type === 'timer'){
    return{
        language : state.language,
        amount: state.amount,
        timer : true,
        bookname : state.bookname,
        id : state.id,
        message : ''
    }
}
if(action.type === 'Dec'){
    if(state.amount>=13999)
    {
    return{
        language : state.language,
        amount: state.amount-action.payload,
        timer : state.timer,
        bookname : state.bookname,
        id : state.id,
        message : ''
    }
}
}
if(action.type === 'islogin'){
    return {
        language : state.language,
        amount: state.amount,
        timer : state.timer,
        bookname : state.bookname,
        id : state.id,
        message : ''
     
    }
}
if(action.type === 'iszero'){
    return {
        language : state.language,
        amount:  0,
        timer : state.timer,
        bookname : state.bookname,
        id : state.id,
        message : ''
    }
}
if(action.type === 'SEND'){
    return {
        language : state.language,
        amount:  0,
        timer : state.timer,
        bookname : state.bookname,
        id : state.id,
        message : 'Items added sucessfully'
    }
}
return state;
}

const customreducer = (state = {Login : false},action) => {
  if(action.type === 'islogin'){
      return {
          Login : true
      }
  }
  return state;
}

const rootreducer = combineReducers({
    books : changereducer,
    custom : customreducer
})

export const senddata = () => {
    return (dispatch) => {
    dispatch(sendmessage())
    }
}

const storage = createStore(rootreducer,applyMiddleware(thunk))

export default storage;

