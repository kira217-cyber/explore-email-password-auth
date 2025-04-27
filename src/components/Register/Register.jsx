import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  // Error ar jonno state declear

  const [errorMassage, setErrorMassage] = useState(" ");

  // Success ar jonno state declear kora holo

  const [success, setSuccess] = useState(false);

  // Show and Hide Password korar jonno State declear

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    // Reset korta hobe noila out put a message dekhabe

    setSuccess(false);
    setErrorMassage(" ");

    // Terms and condition ar jonno condition use kora holo

    if(!terms){
      setErrorMassage("Please Accept Our Terms and Condition")
      return
    }

    // Password Validate korar jonno kisu terms
    const passwordRegExp = /(?=.*\d)/;

    const passwordRegExp2 = /(?=.*[a-z])/;

    const passwordRegExp3 = /(?=.*[A-Z])/;

    const passwordRegExp4 = /.{8,}/;

    if (passwordRegExp.test(password) === false) {
      setErrorMassage("Password Must Have One Digit Number");
      return;
    } else if (passwordRegExp2.test(password) === false) {
      setErrorMassage("Password Must Have One Lowercase Letter");
      return;
    } else if (passwordRegExp3.test(password) === false) {
      setErrorMassage("Password Must Have One Uppercase Letter");
      return;
    } else if (passwordRegExp4.test(password) === false) {
      setErrorMassage("Password Must Have 8 Character");
      return;
    }

    // Create user email and password from firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        

        // Email verify ki na ta janner jonno Email verify korlam
        sendEmailVerification(auth.currentUser)
        .then(()=>{
          setSuccess(true);
          alert("We sent you a verification email. please check your email")
        })

      })
      .catch((error) => {
        setErrorMassage(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Please Register Now!</h1>
        <form onSubmit={handleRegister} className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input"
              placeholder="Password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-xs absolute top-2 right-6"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <label className="label mt-2">
            <input type="checkbox" name="terms" className="checkbox" />
            Accept Terms and Condition
          </label>
          <br />
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <p>Already Have an Account? Please <Link className="text-blue-500 underline" to='/login'>Login</Link></p>
        {errorMassage && <p className="text-red-500">{errorMassage}</p>}
        {success && (
          <p className="text-green-500">User Has Created Successfully</p>
        )}
      </div>
    </div>
  );
};

export default Register;
