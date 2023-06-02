import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CreateAccount () {
  const [waiting, setWaiting] = useState(false)

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [retypedPassword, setRetypedPassword] = useState('')

  const updateUserName = (event: any) => { setUserName(event.target.value) }
  const updatePassword = (event: any) => { setPassword(event.target.value) }
  const updateRetypedPassword = (event: any) => { setRetypedPassword(event.target.value) }

  interface createAccountResponse {
    status: string
  }

  const handleSubmit = () => {
    if (password !== retypedPassword) {
      throw new Error('Entered passwords do not match, please try again')
    } else {
      fetch('/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, password })
      }).then((data): Promise<createAccountResponse> => {
        return data.json() as Promise<createAccountResponse>
      }).then((responseBody: createAccountResponse) => {
        console.log(responseBody.status)
        if (responseBody.status) { updateModalForCreate() } else { throw new Error('Problem with respone from create handler. See server logs.') }
      }).catch((error) => {
        console.log(`Error caught on update submit event: ${error}`)
        updateModalForCreate(error)
      })
    }
  }

  const updateModalForCreate = (error = false) => {
    const createAccountModal = document.querySelector('#modalBox-createAccount')
    if (createAccountModal) {
      setWaiting(false)
      createAccountModal.innerHTML = (error ? `Operation failed: ${error}` : 'Operation was successful. <br /> What\'s done is done.') + '<br /> Redirecting to the home page in 5 seconds'
      setTimeout(() => {
        window.location.href = '/'
      }, 5000)
    }
  }

  return (
    <div id="create-account" className=" flex flex-col mt-7 justify-center items-center min-w-max">
      <h1 className="text-xl">Account Creation</h1>
      <div className='border p-4 w-full mt-7 max-w-xs rounded-md'>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Username (email address)</span>
          </label>
          <input type="email" placeholder="user@company.com" className="input input-bordered w-full max-w-xs" onChange={updateUserName} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span id="label-password" className="label-text">Password</span>
          </label>
          <input id="input-password" placeholder="Type here" type="password" className="input input-bordered w-full max-w-xs" onChange={updatePassword}/>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span id="label-retyped-password" className="label-text">Re-Enter Your Password</span>
          </label>
          <input id="input-retyped-password" placeholder="Type here" type="password" className="input input-bordered w-full max-w-xs" onChange={updateRetypedPassword} />
          <label>
            <span id="label-match-warning" className="text-red-700"> {(retypedPassword.length > 0 && password !== retypedPassword ? 'passwords do not match' : '')} </span>
          </label>
        </div>

        <div className = "flex justify-between">
          <a href="#modal-createAccount"><button className="btn mt-2" onClick={handleSubmit} disabled={((userName.length < 3 || password.length < 3 || retypedPassword.length < 3) || (retypedPassword.length > 0 && password !== retypedPassword))}>Submit</button></a>
          <Link to='/' role="button" className="btn btn-outline mt-2">
          Cancel
          </Link>
        </div>
      </div>

      <div className="modal" id="modal-createAccount">
        <div className="modal-box" id="modalBox-createAccount">
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
