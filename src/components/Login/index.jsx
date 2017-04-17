import React, { PropTypes } from 'react'
import styles from './login.css'

const propTypes = {
  onAuth: PropTypes.func.isRequired
}

function Login ({ onAuth }) {
  return (
    <div className={styles.root}>
      <p className={styles.text}>
        Login please
      </p>
      <button
        onClick={onAuth}
        className={styles.button}
        >
        <i className='fa fa-github' /> Login with Github
        </button>
    </div>
  )
}

Login.propTypes = propTypes
export default Login
