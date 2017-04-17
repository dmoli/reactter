import React, { PropTypes, Component } from 'react'
import uuid from 'uuid'
import firebase from 'firebase'
import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

const propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: Object.assign({}, this.props.user, { retweets: [] }, { favorites: [] }), // clon user from father class
      usernameToReply: null,
      openText: false,
      messages: []
    }

    this.handleOpenText = this.handleOpenText.bind(this)
    this.handleSendText = this.handleSendText.bind(this)
    this.handleCloseText = this.handleCloseText.bind(this)
    this.handleRetweet = this.handleRetweet.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleReply = this.handleReply.bind(this)
  }

  componentWillMount () {
    const messageRef = firebase.database().ref().child('messages')
    messageRef.on('child_added', snapshot => {
      this.setState({
        messages: this.state.messages.concat(snapshot.val()),
        openText: false
      })
    })
  }

  handleOpenText (event) {
    event.preventDefault()
    this.setState({ openText: true })
  }

  handleSendText (event) {
    event.preventDefault()
    let newMessage = {
      id: uuid.v4(),
      username: this.props.user.email.split('@')[0],
      displayName: this.props.user.displayName,
      picture: this.props.user.photoURL,
      date: Date.now(),
      text: event.target.text.value,
      retweets: 0,
      favorites: 0
    }

    const messageRef = firebase.database().ref().child('messages')
    const messageID = messageRef.push()
    messageID.set(newMessage)
  }

  handleCloseText (event) {
    event.preventDefault()
    this.setState({ openText: false })
  }

  handleRetweet (id) {
    let retweeted = this.state.user.retweets.filter(rt => rt === id)

    // not retweeted
    if (retweeted.length === 0) {
      // messages will to get a new array
      let messages = this.state.messages.map(msg => {
        if (msg.id === id) {
          msg.retweets++
          // firebase
        }
        return msg
      })

      // create a object with the other
      let user = Object.assign({}, this.state.user)
      user.retweets.push(id)

      this.setState({
        messages,
        user
      })
    }
  }

  handleFavorite (id) {
    let favorited = this.state.user.favorites.filter(fav => fav === id)
    if (favorited.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === id) {
          msg.favorites++
          // firebase
        }
        return msg
      })

      let user = Object.assign({}, this.state.user)
      user.favorites.push(id)

      this.setState({
        messages,
        user
      })
    }
  }

  handleReply (id, usernameToReply) {
    this.setState({
      openText: true,
      usernameToReply
    })
  }

  renderOpenText () {
    if (this.state.openText) {
      return (
        <InputText
          onSendText={this.handleSendText}
          onCloseText={this.handleCloseText}
          usernameToReply={this.state.usernameToReply}
        />
      )
    }
  }

  render () {
    return (
      <div>
        <ProfileBar
          picture={this.props.user.photoURL}
          username={this.props.user.email.split('@')[0]}
          onOpenText={this.handleOpenText}
          onLogout={this.props.onLogout}
        />
        { this.renderOpenText() }
        <MessageList
          messages={this.state.messages}
          onRetweet={this.handleRetweet}
          onFavorite={this.handleFavorite}
          onReply={this.handleReply}
        />
      </div>
    )
  }
}

Main.propTypes = propTypes
export default Main
