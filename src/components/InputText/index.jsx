import React, { PropTypes } from 'react'
import styles from './input-text.css'

const propTypes = {
  onSendText: PropTypes.func.isRequired,
  usernameToReply: PropTypes.string,
  onCloseText: PropTypes.func.isRequired
}

function InputText ({ onSendText, usernameToReply, onCloseText }) {
  return (
    <div>
      <form className={styles.form} onSubmit={onSendText}>
        <textarea className={styles.text} name='text'>
          {(usernameToReply) ? `@${usernameToReply} ` : ''}
        </textarea>
        <div className={styles.buttons}>
          <button className={styles.close} onClick={onCloseText}>Close</button>
          <button className={styles.send} type='submit'>Send</button>
        </div>
      </form>
    </div>
  )
}

InputText.propTypes = propTypes
export default InputText
