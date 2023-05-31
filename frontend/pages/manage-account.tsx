import { useState, SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'

export default function ManageAccount () {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [retypedPassword, setRetypedPassword] = useState('')

  const updateUserName = (event: SyntheticEvent) => {setUserName(event.target.value)}
  const updatePassword = (event: any) => {setPassword(event.target.value)}
  const updateRetypedPassword = (event: any) => {setRetypedPassword(event.target.value)}

  return (
    <div id="create-account" className=" flex flex-col justify-center items-center min-w-max">
      <header className="mt-2 text-2xl">This is a Header Stand-in for Account Management </header>
      <div className='border p-4 w-full mt-7 max-w-xs rounded-md'>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="lbel-text">E-mail (Username)</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" disabled />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input placeholder="Type here" type="password" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Re-Enter Your Password</span>
          </label>
          <input placeholder="Type here" type="password" className="input input-bordered w-full max-w-xs" />
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
