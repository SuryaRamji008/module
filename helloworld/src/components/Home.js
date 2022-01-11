import React from 'react'
import { useHistory,Link } from 'react-router-dom'
import classes from './Home.module.css'

function Home() {

    const history = useHistory()

      const iaspage = () => {
          history.push('/iasBooks')
      }

      const bookformpage = () => {
        history.push('/BookForm')
    }

    const CustomBooks = () => {
        history.push('/CustomBooks')
    }

    const logouthandler = (e) => {
        e.preventDefault();
        history.replace('/Login')
    }



    return (
        <div className = {classes.bg}>
            <div>
            <header className = {classes.header}>
             <h1 className = {classes.logo}>Home Page</h1>
             <h1 className = {classes.logo}><Link to = '/Cart'>
                 Cart
                </Link></h1>
                <h1 className = {classes.logo}><Link onClick = {logouthandler}>
                Log Out
                </Link></h1>
            </header>
            </div>
            <div >
            <div style = {{marginTop:'150px'}}>
            <button className = {classes.button} onClick = {bookformpage}>Create Book</button>
            </div>
            <div>
            <button className = {classes.button}  onClick = {iaspage}>
                IAS Books
            </button>
            </div>
            <div>
            <button className = {classes.button}  onClick = {CustomBooks}>
               Custom Books
            </button>
            </div>
            </div>
         </div>
    )
}

export default Home
