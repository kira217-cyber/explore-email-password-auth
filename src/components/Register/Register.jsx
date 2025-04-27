
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";


const Register = () => {
  // Error ar jonno state declear

  const [errorMassage,setErrorMassage] = useState(' ')

  const handleRegister = e =>{
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMassage(' ')
    

    // Create user email and password from firebase
    createUserWithEmailAndPassword(auth,email,password)
    .then(result=>{
      console.log(result)
    }).catch(error=>{
      setErrorMassage(error.message)
    })


  }



  return (

    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
      <h1 className="text-3xl font-bold">Please Register Now!</h1>
        <form onSubmit={handleRegister} className="fieldset">
          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        {
          errorMassage && <p className="text-red-500">{errorMassage}</p>
        }
      </div>
    </div>
 
  );
};

export default Register;
