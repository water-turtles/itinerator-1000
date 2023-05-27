import React from 'react'

export default function LoginModal () {
  return (
    <div id="login-modal">
      <h1>Let's get you logged in!</h1>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>

      <button className="btn">Submit</button>
      <p>Forgot password?</p>
      <p>New User? Sign Up Here!</p>
    </div>
  )
}
