import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './profile-bar.css'

const propTypes = {
  picture: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onOpenText: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
}

function ProfileBar ({ picture, username, onOpenText, onLogout }) {
  return (
    <div className={styles.root}>
      <Link to='/profile'>
        <figure>
          <img className={styles.avatar} src={picture} />
        </figure>
      </Link>
      <span className={styles.username}>Hola @{username}!</span>
      <button onClick={onOpenText} className={styles.button}>
        <i className='fa fa-lg fa-edit' /> Tweet!
      </button>
      <button onClick={onLogout} className={styles.button}>
        <i className='fa fa-sign-out' /> Logout
      </button>
    </div>
  )
}

ProfileBar.propTypes = propTypes
export default ProfileBar
