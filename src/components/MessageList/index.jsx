import React, { PropTypes } from 'react'
// import PlatzigramClient from 'platzigram-client'
// import config from '../../config'
// const client = PlatzigramClient.createClient(config)
import Message from '../Message'
import styles from './message-list.css'

const propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRetweet: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired
}

function MessageList ({ messages, onRetweet, onFavorite, onReply }) {
  /*
  componentWillMount () {
    this.listPictures()
  }
  */

  /*
  listPictures () {
    client.listPictures()
      .then(result => console.log(result))
      .catch(err => console.log(`${err.code} ${err.message}`))
  }
  */

  return (
    <div className={styles.root}>
      {
        messages.map(message => {
          return (
            <Message
              key={message.id}
              message={message}
              onRetweet={() => onRetweet(message.id)} // this sintax is to when click the button, send id params
              onFavorite={() => onFavorite(message.id)}
              onReply={() => onReply(message.id, message.username)}
            />
          )
        }).reverse()
      }
    </div>
  )
}

MessageList.propTypes = propTypes
export default MessageList
