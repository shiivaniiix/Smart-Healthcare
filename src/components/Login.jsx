import { useState } from 'react';
import mainImage from '../assets/main page.png';
import { Link,useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase';

const Login = () => {

    const navigate = useNavigate()
    const [values, setValues] = useState({
      email: '',
      pass: '',
    });
  
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled,setSubmitButtonDisabled] = useState(false)
  
    const handleSubmission = (event) => {
      event.preventDefault();
      if(!values.email || !values.pass){
          setErrorMsg("Please Fill Each Section");
          return;
      }
      setErrorMsg("")
  
      setSubmitButtonDisabled(true);
      signInWithEmailAndPassword(auth,values.email,values.pass)
          .then(
              async () => {
                  setSubmitButtonDisabled(false);
                  navigate("/homepage")
                  // console.log(user)
              })
          .catch((err) => {
              setErrorMsg(err.message)
              console.log("Error : ",err.message)
              setSubmitButtonDisabled(false);
          })
      // console.log(values); // Log form values
    };


  return (
    <div className="flex min-h-screen">
    {/* Left section: Sign Up Form */}
    <div className="w-full lg:w-1/2 px-6 py-12 bg-white flex flex-col justify-center">
    <div className="sm:mx-auto sm:w-full sm:max-w-md justify-center items-center">
        <div className="flex justify-center items-center">
            <img
                src="favicon.ico"
                style={{ height: "8vh", paddingLeft: "5vh" }}
                className="logo"
                alt="Learn English"
                id="header-img"
            />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">            Login to your account</h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmission}>
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
            <input 
                id="email" 
                name="email" 
                type="email"
                placeholder='Enter Your Email' 
                autoComplete="email" required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                }
            />
            </div>
        </div>

        <div>
            <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div className="mt-2">
            <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                placeholder='Enter Your Password'
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" 
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
            />
            </div>
        </div>

        <div>
        <b className='text-red-600 font-bold text-xl'>
                {errorMsg}
            </b>
            <button 
                type="submit"
                disabled={submitButtonDisabled}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
        </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {/* <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</a> */}
        <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
        > Sign Up
        </Link>
        </p>
    </div>
    </div>

    {/* Right section: Full-Width Image */}
    <div 
    className="hidden lg:block lg:w-1/2 bg-cover bg-center" 
    style={{ backgroundImage: `url(${mainImage})` }}>
    {/* Optionally, you can use an img tag here if you prefer */}
    </div>
    </div>
  );
};

export default Login;
