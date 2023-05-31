import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CreateAccount () {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [retypedPassword, setRetypedPassword] = useState('')

  const updateUserName = (event: any) => {
    setUserName(event.target.value)
  }

  const updatePassword = (event: any) => {
    setPassword(event.target.value)
  }

  const updateRetypedPassword = (event: any) => {
    setRetypedPassword(event.target.value)
  }

  return (
    <div id="create-account" className=" flex flex-col mt-7 justify-center items-center min-w-max">
      <h1 className="text-xl">Account Creation</h1>
      <div className='border p-4 w-full mt-7 max-w-xs rounded-md'>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">E-mail (Username)</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={updateUserName} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input placeholder="Type here" type="password" className="input input-bordered w-full max-w-xs" onChange={updatePassword}/>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Re-Enter Your Password</span>
          </label>
          <input placeholder="Type here" type="password" className="input input-bordered w-full max-w-xs" onChange={updateRetypedPassword} />
        </div>

        <div className = "flex justify-between">
          <button className="btn mt-2">Submit</button>
          <Link to='/' role="button" className="btn btn-outline mt-2">
          Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}
