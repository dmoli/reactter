import React, { PropTypes } from 'react'
import styles from './profile.css'

const propTypes = {
  picture: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
}

function Profile ({ picture, displayName, username, email, location }) {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={picture} />
      <span className={styles.name}>{displayName}</span>
      <ul className={styles.data}>
        <li>
          <i className='fa fa-user' /> {username}
        </li>
        <li>
          <i className='fa fa-envelope' /> {email}
        </li>
        <li>
          <i className='fa fa-map-marker' /> {location}
        </li>
      </ul>
    </div>
  )
}

Profile.propTypes = propTypes
export default Profile
