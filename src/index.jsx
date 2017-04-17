import React, { Component } from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'
firebase.initializeApp({
  apiKey: '',
  authDomain: 'reactter-5a049.firebaseapp.com',
  databaseURL: 'https://reactter-5a049.firebaseio.com',
  projectId: 'reactter-5a049',
  storageBucket: 'reactter-5a049.appspot.com',
  messagingSenderId: ''
})
import App from './components/App'

render(<App />, document.getElementById('root'))
