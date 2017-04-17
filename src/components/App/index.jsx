import React, { Component } from 'react'
import {
  HashRouter,
  Match
} from 'react-router'
import 'normalize-css'
import firebase from 'firebase'

import './app.css'
import Header from '../Header'
import Main from '../Main'
import Profile from '../Profile'
import Login from '../Login'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null
    }
    this.handleOnAuth = this.handleOnAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  handleOnAuth () {
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(result.user.email))
      .catch(error => console.log(`Error: ${error.code} - ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(() => console.log('Logout'))
      .catch(error => console.log(`${error.code} ${error.message}`))
  }

  render () {
    return (
      <HashRouter>
        <div>
          <Header user={this.state.user} />

          <Match exactly pattern='/' render={() => {
            if (this.state.user) {
              return (
                <Main
                  user={this.state.user}
                  onLogout={this.handleLogout}
                />
              )
            } else {
              return (
                <Login onAuth={this.handleOnAuth} />
              )
            }
          }} />

          <Match pattern='/profile' render={() => (
            <Profile
              picture={this.state.user.photoURL}
              username={this.state.user.email.split('@')[0]}
              displayName={this.state.user.displayName}
              email={this.state.user.email}
              location={this.state.user.location}
            />
            )} />

          <Match pattern='/user/:username' render={({ params }) => { // { params } is a destructuring
            return (
              <Profile
                displayName={params.username}
                username={params.username}
              />
            )
          }} />
        </div>
      </HashRouter>
    )
  }
}

export default App
