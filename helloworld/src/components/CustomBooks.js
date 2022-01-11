import React, { useEffect,useState } from 'react'
// import { useSelector } from 'react-redux';
import classes from './CustomBooks.module.css'
import {Link} from 'react-router-dom'

function CustomBooks() {

  const [items,setitems] = useState([])


    useEffect(() => {
      fetch('https://react-http-7e211-default-rtdb.firebaseio.com/custom.json')
      .then((res) => {
          return res.json()
      })
      .then((data) => {
       const list = []
       for(const key in data)
       {
         list.push({
           BookName : data[key].Bookname,
           amount: data[key].amount,
           language: data[key].language
         })
       }
       console.log(list)
       setitems(list)
      })
    }, [])

    return (
        <div>
             <header className = {classes.header}>
             <h1 className = {classes.logo}>Custom Books</h1>
             <h1 style = {{marginRight:'500px'}}>
             <Link to = '/Search'>Search</Link></h1>
             </header>
            {items.length ? <div style = {{marginTop : '100px'}}><text style = {{marginLeft:'250px', fontSize : '20px'}}>Name</text><text style = {{marginLeft:'425px',fontSize : '20px'}}>Price</text><text style = {{marginLeft:'410px', marginTop : '500px',  fontSize : '20px'}}>Language</text></div>:''}
            <div> {items.map((item,index) => {
                     return (
                        <div key={index} className = {classes.list}> 
                        <text className = {classes.items}>{item.BookName}</text> <text className = {classes.items}>{item.amount}</text><text className = {classes.items}>{item.language}</text></div>)
              }) 
            }</div> 
        </div>
    )
}

export default CustomBooks
