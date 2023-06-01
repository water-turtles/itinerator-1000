function Header () {
  return (
    <div className="navbar bg-base-200" data-theme="coffee">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href='/'>Itinerator-1000</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Trips</a></li>
          <li tabIndex={0}>
            <a>
              Get Started
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li><a>Create New Trip</a></li>
              <li><a>Open Shared Trip</a></li>
            </ul>
          </li>
          <li><a className="btn btn-outline btn-accent">Log In</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Header
