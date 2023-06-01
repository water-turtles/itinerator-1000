import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login () {
  const [waiting, setWaiting] = useState(false)

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const updateUserName = (event: any) => { setUserName(event.target.value) }
  const updatePassword = (event: any) => { setPassword(event.target.value) }

  interface loginResponse{
    status: string
  }

  const handleSubmit = () => {
    fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, password })
    }).then((data): Promise<loginResponse> => {
      return data.json() as Promise<loginResponse>
    }).then((responseBody: loginResponse) => {
      console.log(responseBody.status)
      if (responseBody.status) { updateModalForLogin() } else { throw new Error('Problem with respone from create handler. See server logs.') }
    }).catch((error) => {
      console.log(`Error caught on update submit event: ${error}`)
      updateModalForLogin(error)
    })
  }

  const updateModalForLogin = (error = false) => {
    const loginModal = document.querySelector('#modalBox-login')
    if (loginModal) {
      setWaiting(false)
      loginModal.innerHTML = (error ? `Login failed: ${error}` : 'Login successful. <br /> Please wait.')
      setTimeout(() => {
        window.location.href = (error ? '/' : '/itineraries')
      }, 5000)
    }
  }

  return (
    <div id="login" className=" flex flex-col justify-center items-center min-w-max">
      <div className='border p-4 w-full max-w-xs rounded-md'>
        <h1>Let's get you logged in!</h1>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="lbel-text">Email</span>
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

      <div className="modal" id="modal-login">
        <div className="modal-box" id="modalBox-login">
          <h3 className="font-bold text-lg">Submission Status</h3>
          <p id = "submissionStatus" className="py-4"> Information submitted, please wait!</p>
          {/* <div className="modal-action">
            <a href="#" className="btn btn-warning">Try again</a>
          </div> */}
        </div>
      </div>

    </div>
  )
}
