import { error } from 'console'
import { useState, SyntheticEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ManageAccount (userID: string) {
  const [waiting, setWaiting] = useState(false)

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [retypedPassword, setRetypedPassword] = useState('')

  const updateUserName = (event: SyntheticEvent) => { setUserName((event.target as HTMLInputElement).value) }
  const updatePassword = (event: SyntheticEvent) => { setPassword((event.target as HTMLInputElement).value) }
  const updateRetypedPassword = (event: SyntheticEvent) => { setRetypedPassword((event.target as HTMLInputElement).value) }

  const handleSubmit = () => {
    fetch(`/api/user/:${userID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    }).catch((error) => {
      console.log(`Error caught on update submit event: ${error}`)
    })
  }

  // Will need username and ID (per the database) stored in state
  // This will either be passed into this function via props OR we will need a fetch call in this component

  interface deleteAccountResponse {
    status: string
  }

  const handleDeleteAccount = () => {
    setWaiting(true)
    fetch(`/api/user/:${userID}`, {
      method: 'DELETE'
    }).then((data): Promise<deleteAccountResponse> => {
      return data.json() as Promise<deleteAccountResponse>
    }).then((responseBody: deleteAccountResponse) => {
      console.log(responseBody.status)
      if (responseBody.status) { updateModalForDelete() } else { throw new Error('Problem with respone from delete handler. See server logs.') }
    }).catch((error) => {
      console.log(`error caught on delete event: ${error}`)
      updateModalForDelete(error)
    })
  }

  const updateModalForDelete = (error = false) => {
    const deleteAccountModal = document.querySelector('#modalBox-deleteAccount')
    if (deleteAccountModal) {
      setWaiting(false)
      deleteAccountModal.innerHTML = (error ? `Operation failed: ${error}` : 'Operation was successful. <br /> What\'s done is done.') + '<br /> Redirecting to the home page in 5 seconds'
      setTimeout(() => {
        window.location.href = '/'
      }, 5000)
    }
  }

  return (
    <div id="create-account" className=" flex flex-col justify-center items-center min-w-max">
      <header className="mt-2 mb-7 text-2xl">This is a Header Stand-in for Account Management </header>
      <p className="text-lg"> Welcome to the account management console </p>
      <p> From this page, you can update your password or delete your account (please don't!) </p>
      <div className='border p-4 w-full mt-7 max-w-xs rounded-md'>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">E-mail</span>
            <a href="#modal-deleteAccount"><span className="label-text text-muted"> delete account </span></a>
          </label>
          <input id="Inp-userName" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" disabled />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">New Password</span>
          </label>
          <input placeholder="Type here" type="password" className="input input-bordered w-full max-w-xs" onChange={updatePassword}/>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Re-Enter Your Password</span>
          </label>
          <input placeholder="Type here" type="password" className="input input-bordered w-full max-w-xs" onChange={updateRetypedPassword} />
          <label>
            <span id="label-match-warning" className="text-red-700"> {(password === retypedPassword ? '' : 'passwords do not match')} </span>
          </label>
        </div>

        <div className = "flex justify-between">
          <button className="btn mt-2" onClick={handleSubmit} disabled={(password !== retypedPassword)}>Submit</button>
          {/* <Link to='/' role="button" className="btn btn-outline mt-2">
          Cancel
          </Link> */}
        </div>
      </div>

      {/* This modal will be called by an anchor tag earlier in this return statement */}
      <div className="modal" id="modal-deleteAccount">
        <div className="modal-box" id="modalBox-deleteAccount">
          <h3 className="font-bold text-lg">Account Deletion</h3>
          <p className="py-4"> Click the button below if you really want to delete your account. <br /> This action is not reversible. </p>
          <button className='btn' onClick={handleDeleteAccount}>Delete Account</button>
          <div className="modal-action">
            <a href="#" className="btn btn-warning">Cancel</a>
          </div>
        </div>
      </div>
    </div>
  )
}
