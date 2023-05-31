import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login () {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const updateUserName = (event: any) => {
    setUserName(event.target.value)
  }

  const updatePassword = (event: any) => {
    setPassword(event.target.value)
  }

  return (
    <div id="login" className=" flex flex-col justify-center items-center min-w-max">
      <div className='border p-4 w-full max-w-xs rounded-md'>
        <h1>Let's get you logged in!</h1>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="lbel-text">Username</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={updateUserName} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
            <a href="/forgotten-password"><span className="label-text-alt">Forgot Password?</span></a>
          </label>
          <input placeholder="Type here" type="password" className="input input-bordered w-full max-w-xs" onChange={updatePassword}/>
        </div>

        <button className="btn mt-2">Submit</button>
      </div>
      <Link to='create-account' role="button" className="btn mt-2  w-full max-w-xs">
          New User? Click Here!
      </Link>

    </div>
  )
}
