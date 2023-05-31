import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import App from './App'
import ErrorPage from './pages/error-page'
import './index.css'
import CreateAccount from './pages/create-account'
import ManageAccount from './pages/manage-account'

const router = createBrowserRouter([
  {
    path: '/create-account',
    element: <CreateAccount />
  },
  {
    path: '/manage-account',
    element: <ManageAccount />
  },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  }

])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
