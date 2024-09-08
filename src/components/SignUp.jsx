import { useState } from 'react';
import mainImage from '../assets/main page.png';
import { Link,useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase';

const SignUp = () => {
    const navigate = useNavigate()
  const [values, setValues] = useState({
    name: '',
    email: '',
    pass: '',
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled,setSubmitButtonDisabled] = useState(false)

  const handleSubmission = (event) => {
    event.preventDefault();
    if(!values.name || !values.email || !values.pass){
        setErrorMsg("Please Fill Each Section");
        return;
    }
    setErrorMsg("")

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth,values.email,values.pass)
        .then(
            async (res) => {
                setSubmitButtonDisabled(false);
                const user = res.user;
                await updateProfile(user,{
                    displayName:values.name,
                })
                navigate("/")
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
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${mainImage})`,
          backgroundSize: 'cover',
        }}
      ></div>

      <div className="w-full lg:w-1/2 px-6 py-12 bg-white flex flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md justify-center items-center">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleSubmission}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="text"
                  placeholder="Enter Your Name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, name: event.target.value })) // Corrected to set 'name'
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter Your Email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  autoComplete="current-password"
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
                disabled={submitButtonDisabled}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
