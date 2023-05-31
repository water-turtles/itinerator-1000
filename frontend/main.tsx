import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import App from './App'
// import ErrorPage from './pages/error-page'
import './index.css'
// import CreateItinerary from './components/CreateItinerary'
// import Dashboard from './components/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
    // errorElement: <ErrorPage />
  // },
  // {
  //   path: '/create',
  //   element: <CreateItinerary/>
  // },
  // {
  //   path: '/dashboard',
  //   element: <Dashboard/>
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
