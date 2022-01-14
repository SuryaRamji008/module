import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import classes from './Cart.module.css'
import {Link} from 'react-router-dom'

function Cart() {

    const [items, setitems] = useState([])
    const [del, setdel] = useState(false)
    const [total, settotal] = useState(0)
    var sum = 0

    const message = useSelector(state => state.books.message)


    useEffect(() => {
    fetch('https://react-http-7e211-default-rtdb.firebaseio.com/books.json')
        .then((response) => {
                return response.json();
        })
        .then((data) => {
            const list = []
            for(const key in data){
                list.push({
                    id : key,
                    bn : data[key].Bookname,
                    am : data[key].amount,
                    lang : data[key].language
                })
            }
            for(const key in data){
                sum += data[key].amount;    
            }
          settotal(sum)
          setitems(list)
        })
    },[del])

    const removeitem = (id) => {
     fetch(`https://react-http-7e211-default-rtdb.firebaseio.com/books/${id}.json` ,{
         method: 'DELETE',
        })
        .then((res) => {
         setdel(!del)
          return res.json()
        })
    }

    return (
        <div>
            <header><h1 className = {classes.logo}>
                <Link to = '/Home'>
                    Home Page
                </Link></h1>
                <h1> {message}</h1>
                <h1 className = {classes.logo}>Cart</h1></header>
                {items.length ? <div><text style = {{marginLeft:'100px', fontSize : '20px'}}>Name</text><text style = {{marginLeft:'200px',fontSize : '20px'}}>Price</text><text style = {{marginLeft:'180px',fontSize : '20px'}}>Language</text></div> : ''}
            <div>
               
                {items.length ? items.map((item,index) => {
                     return (
                        <div key={index} className = {classes.list}> 
                        <text className = {classes.items}>{item.bn}</text> <text className = {classes.items}>{item.am}</text><text className = {classes.items}>{item.lang}</text>
                       <button className = {classes.button} onClick = {() => { removeitem(item.id)}}>Remove</button></div> 
                     )
                }) : <h1 style = {{textAlign:'center',marginTop:'100px'}}>No Items in Cart </h1>
            }
            </div>
            <h1>TOTAL - {total}</h1>
        </div>
    )
}

export default Cart
