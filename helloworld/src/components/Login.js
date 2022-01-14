import { React, useState,useEffect, useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router";
import classes from './Login.module.css'


export default function App() {

  const [eml, seteml] = useState(false);
  const [isPValid, setisPValid] = useState(false);
  const [pntouched, setpntouched] = useState(false)
  const [pwtouched, setpwtouched] = useState(false)
  const [iserror, setiserror] = useState(false)



  const Pn = useRef()
  const password = useRef()

  const dispatch = useDispatch()

  const Phonenumber = () => {
    const num = Pn.current.value
    if (num.toString().length < 25) {
      setisPValid(true);
    } else {
      setisPValid(false);
    }
  };
  

  const Passwordhandler = () => {
    const ispassword = password.current.value; 
    var a = ispassword.trim()
    var pat = new RegExp(/[!@=+?#$%^&*()]/)
    var passwordstatus = pat.test(a)
   if(passwordstatus){
      seteml(true)
    }
    else {
      seteml(false)
    }
  }

  const Pntouched = () => {
    setpntouched(true)
  }

  const passwordtouched = () => {
  setpwtouched(true)
  }

  const isformvalid = eml && isPValid
  const pninvalid = !isPValid && pntouched
  const pwinvalid = !eml && pwtouched

  if(pwinvalid === true){
   var inputstyle = {
     border : '1px solid red',
     padding: '3px',
     borderradius : '10px',
    }
   }
  else {
    inputstyle = {
      border : '1px solid gray',
      borderradius : '10px',
      padding: '3px'
     }
   }

 



   const history = useHistory()
   
   const loginhandler = (event) => {
     event.preventDefault();
     const ispassword = password.current.value; 
     const num = Pn.current.value
     const credentials = {
      email : num,
      password : ispassword,
      returnSecureToken : true
     }
     fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAR7sjR_BU19GcyJe_BSYNg2pn7goamI9o',{
       method : 'POST',
       body: JSON.stringify(credentials),
       headers : {
        'Content-Type': 'application/json'
       }
     })
     .then((res) => {
       if(res.ok){
        return res.json();
       }
       else{
         return res.json().then((data) => {
           let message = 'Authentication Failed'
           setiserror(true)
           throw new Error(message)
          }) 
       }
     })
     .then((data) => {
       console.log(data)
       setiserror(false)
       dispatch({type:'islogin'})
       history.replace('/Home')
     })
     .catch((err) => {
      console.log(err)
     })
   }

  return (
    <div>
      <h1 className = {classes.h1}>Sign In</h1>
      <form className = {classes.form}>
        <div className = {classes.field}>
        <div className = {classes.label}><label>Email Id</label> </div>
        <div><input type='text' style = {inputstyle} onChange={Phonenumber} ref ={Pn} onBlur = {Pntouched} /></div>
        {pninvalid ? (<h3 style={{ color: 'red',fontSize : '12px' }}>Enter valid Email Id</h3>) : ''}
        </div>
        <div><div className = {classes.label}><label>Password</label></div>
        <div><input type = "password" style = {inputstyle} onChange={Passwordhandler} ref = {password} onBlur = {passwordtouched}/></div></div>
        <div style = {{marginTop:'20px'}}>
        {pwinvalid ? (<h3 style={{ color: 'red',fontSize : '12px' }}>the password must include special character</h3>) : ''}
        {isformvalid && <button style = {{height:'25px'}} onClick = {loginhandler}>Submit</button>} 
        {iserror && <h3>Invalid Credentials</h3>}
        </div>
      </form>
    </div>
  );
}