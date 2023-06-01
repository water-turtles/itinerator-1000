import React from 'react'
import { useRouteError } from 'react-router-dom'
import styles from './ErrorPage.module.css'

const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  console.error('Error in navigating to desired route: ', error)

  return (
    <div id="error-page" className={styles.container}>
      <div className={styles.innerText}>
        <h1>{error.status}</h1>
        <h2>Uh-oh!</h2>
        <p>You got lost.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}

export default ErrorPage
