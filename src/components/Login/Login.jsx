import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase.init";
import { Link } from "react-router";

const Login = () => {
    // Error ar jonno state declear kora hoisa
    const [errorMassage, setErrorMassage] = useState('')
    // Success ar jonno state kora holo
    const [success, setSuccess] = useState(false)
    // Jodi vahir thake kisu nita jabo tokhon useRef babohar korlam
    const emailRef = useRef()


    const handleLogin = e =>{
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        // state Reset korta hobe noila by default state change hobe na
        setErrorMassage('')
        setSuccess(false)

        // Login User with email and password
        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user)
            if(!result.user.emailVerified){
                alert("Please verify your email address")
            }else{
                setSuccess(true)
            }
            
        }).catch(error=>{
            console.log(error)
            setErrorMassage(error.massage)
        })
    }
    // Forget Password ar jonno akta function korlam
    const handleForgetPassword = ()=>{

        const email = emailRef.current.value

        setErrorMassage('')

        // Send password reset email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("A password reset email is sent. please check your email.")
        }).catch(error=>{
            setErrorMassage(error.massage)
        })

    }

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleLogin} className="fieldset">
          <label className="label">Email</label>
          <input type="email" name="email" ref={emailRef} className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />
          <div onClick={handleForgetPassword}>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <p>New to this Website? Please <Link className="text-blue-500 underline" to="/register">Register</Link></p>
        {
            errorMassage && <p className="text-red-500">
                {errorMassage}
            </p>
        }
        {
            success && <p className="text-green-500">User Login Successfully</p>
        }
      </div>
    </div>
  );
};

export default Login;
