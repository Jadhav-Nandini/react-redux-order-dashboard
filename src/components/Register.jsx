import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../features/authSlice';




const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')



  function signUp() {
  
    if (!name || !email || !password) {
      setError("Please  fill all field")
    } else {

      console.log("ok registered");

      dispatch(registerUser({ name, email, password }))
      navigate('/dashboard')
    }

  }

  function signUpForm(e){
   e.preventDefault();
   signUp();
}





  return (
    <>
      <div className='container-fluid '>

        <div className='row '>
          <div className="col-12 col-sm-6 offset-0 offset-sm-3 ">
            <div className='my-4 shadow-lg  p-4 rounded-5 bg-white-50'>
              <h1 className=' text-center text-uppercase border-bottom border-primary pb-3 m-4 '>User Sign up Page</h1>


              {error && (
                <div className='alert text-danger fw-semibold'>
                  {error}
                </div>
              )}

              <form onSubmit={signUpForm}>


                <label className='p-1 fw-semibold fs-5 my-3 mx-2'>Name</label>
                <div className='px-2'>
                  <input
                    type="text"
                    placeholder='Enter your Name'
                    className='form-control py-3'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                </div>


                <label className='p-1 fw-semibold fs-5 my-3 mx-2'>Email</label>
                <div className='px-2'>
                  <input
                    type="email"
                    placeholder='Enter your Email'
                    className='form-control py-3'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>

                <label className='p-1 fw-semibold fs-5 my-3 mx-2'>Password</label>
                <div className='px-2'>
                  <input
                    type="password"
                    placeholder='Enter your Password'
                    className='form-control py-3'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                </div>

                <br />

                <button
                  type='submit'
                  // onClick={signUp} 
                  className='btn btn-primary w-100 py-3 fs-5'>
                  Register
                </button>

                <p className='text-center mt-3'>
                  Have an account?{' '}
                  <Link to='/login'>Login</Link>
                </p>
                </form>


            </div>

          </div>
        </div>

      </div>
    </>

  )
}

export default Register