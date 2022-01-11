import { React, useState } from "react";
import classes from './BookForm.module.css'
import {useDispatch} from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [Bookname, setBookname] = useState("");
  const [Language, setLanguage] = useState("");
  const [price, setprice] = useState("");


  const Booknamehandler = (e) => {
    setBookname(e.target.value);
  };

  const Languagehandler = (e) => {
    setLanguage(e.target.value);
  };

  const pricehandler = (e) => {
    setprice(e.target.value);
  };

  const submithandler = (e) => {
    e.preventDefault()

    const CustomBooks = {
      id :  uuidv4(),
      amount : price,
      language:Language,
      Bookname : Bookname
    }
  

  fetch('https://react-http-7e211-default-rtdb.firebaseio.com/custom.json',{
      method : 'POST',
      body : JSON.stringify(CustomBooks)
      })
  .then((res) => {
   return res.json()
  })
  .then((data => {
      return console.log(data)
  }))
  setBookname('')
  setLanguage('')
  setprice('')
  }

  return (
    <div className="App">
        <h1>Book Form</h1>
      <form className = {classes.Form} onSubmit={submithandler}>
        <div>
          <label className = {classes.field}>Book Name</label>
          <input onChange={Booknamehandler} value={Bookname} />
        </div>
        <div>
          <label>Language</label>
          <input onChange={Languagehandler} value={Language} />
        </div>
        <div>
          <label>Price</label>
          <input type ='number' onChange={pricehandler} value={price} />
        </div>
        <div>
          <button className="button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default App;