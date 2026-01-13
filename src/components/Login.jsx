import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../features/authSlice'


const Login = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  const handleLogin = (e) => {
    e.preventDefault()


    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }

    dispatch(loginUser({ email, password }));
  };
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className="col-12 col-sm-6 offset-0 offset-sm-3">
            <div className='my-4 shadow-lg p-4 rounded-4 p-5 bg-white'>
              <h1 className='m-4 text-center text-uppercase border-bottom border-primary pb-3'>
                User Login
              </h1>

              {error && (
                <div className='alert text-center text-danger fw-semibold'>
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>

                <label className='p-1 fw-semibold fs-5 my-3 mx-2'>Email</label>
                <div className='px-2'>
                  <input
                    type="email"
                    placeholder='Enter your Email'
                    className='form-control border-0 border-bottom border-dark-subtle py-3'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>

                <label className='p-1 fw-semibold fs-5 my-3 mx-2'>Password</label>
                <div className='px-2'>
                  <input
                    type="password"
                    placeholder='Enter your Password'
                    className='form-control border-0 border-bottom border-dark-subtle  py-3'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                </div>

                <br />

                <button type='submit'
                  className='btn btn-primary w-100 py-3 fs-5'>
                  Login
                </button>

                <p className='text-center mt-3'>
                  Don't have an account?{' '}
                  <Link to='/'>Register</Link>
                </p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login