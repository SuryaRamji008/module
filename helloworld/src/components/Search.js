import React from 'react'
import { useEffect,useState } from 'react'
import classes from './Search.module.css'
import {useHistory} from 'react-router-dom'
// import Tinkle from './Books/Tinkle' ;
// import Jungle from './Books/Jungle';


function Search() {

    const [items,setitems] = useState([])
    const [sitems,setsitems] = useState([])

  
    const history = useHistory()
  
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
  
      const search = (e) => {
        var s = e.target.value.toLowerCase()
        var filteredResult = items.filter((value) => {
          return value.BookName.toLowerCase().match(new RegExp(s,'g'))
        })
          setsitems(filteredResult)
        }
        
       const navigate = (bn) => {
         history.push(`/Search/${bn}`)
       }

    return (
        <div>
             <header className = {classes.header}>
             <h1 className = {classes.logo}>Search</h1>
             </header>
             <div className = {classes.input}><input style ={{padding:'5px'}} type='text' onChange = {search} /></div>
             <div style = {{marginTop:'200px'}}>
              {sitems.length ? sitems.map((item,index) => {
              return (
                <div key={index} className = {classes.list}> 
                <text className = {classes.items}><button onClick = {()=> {navigate(item.BookName)}}>{item.BookName}</button></text> <text className = {classes.items}>{item.amount}</text><text className = {classes.items}>{item.language}</text>
                <button>order</button>
                </div>)
            }) : <h1 style={{textAlign : 'center'}}>Search Books to display</h1>}</div>
               
        </div>
    )
}

export default Search
