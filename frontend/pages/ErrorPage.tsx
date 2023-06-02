import React from 'react'
import { useRouteError } from 'react-router-dom'
import styles from './ErrorPage.module.css'
import { AiOutlineArrowRight } from 'react-icons/ai'

const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  console.error('Error in navigating to desired route: ', error)

  return (
    <div className={styles.container}>
      <div className={styles.innerText}>
        <p className="text-xl">{error.status}</p>
        <br/>
        <p className="text-3xl">Uh-oh!</p>
        <p className="text-2xl">You took a wrong turn, <br/>an unexpected error occurred.</p>
        <br/>
        <p className="text-xl"><a href='/'>Go back home <AiOutlineArrowRight/></a></p>
      </div>
    </div>
  )
}

export default ErrorPage
