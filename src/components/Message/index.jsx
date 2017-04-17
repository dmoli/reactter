import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import styles from './message.css'

const propTypes = {
  onRetweet: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
}

class Message extends Component {
  constructor () {
    super()
    this.state = {
      clickFavorite: false,
      clickRetweet: false,
      clickReply: false
    }

    this.onClickRetweet = this.onClickRetweet.bind(this)
    this.onClickFavorite = this.onClickFavorite.bind(this)
  }

  onClickRetweet () {
    this.props.onRetweet()
    this.setState({
      clickRetweet: true
    })
  }

  onClickFavorite () {
    this.props.onFavorite()
    this.setState({
      clickFavorite: true
    })
  }

  render () {
    let dateFormat = moment(this.props.message.date).fromNow()
    let userLink = `/user/${this.props.message.username}`

    return (
      <div className={styles.root}>
        <div className={styles.user}>
          <Link to={userLink}>
            <figure>
              <img className={styles.avatar} src={this.props.message.picture} />
            </figure>
          </Link>
          <span className={styles.displayName}>{this.props.message.displayName}</span>
          <span className={styles.username}>{this.props.message.username}</span>
          <span className={styles.date}>{dateFormat}</span>
        </div>
        <h3>{this.props.message.text}</h3>
        <div className={styles.buttons}>
          <div
            className={styles.icon}
            onClick={this.props.onReply}
            >
            <i className='fa fa-reply' />
          </div>
          <div
            className={(this.state.clickRetweet ? styles.retweetTrue : '')}
            onClick={this.onClickRetweet}
          >
            <i className='fa fa-retweet' />
            <span className={styles.num}>{this.props.message.retweets}</span>
          </div>
          <div
            className={(this.state.clickFavorite ? styles.favoriteTrue : '')}
            onClick={this.onClickFavorite}
          >
            <i className='fa fa-star' />
            <span className={styles.num}>{this.props.message.favorites}</span>
          </div>
        </div>
      </div>
    )
  }
}

Message.propTypes = propTypes
export default Message
