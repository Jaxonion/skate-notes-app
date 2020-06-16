import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

//import pages

import appContext from './appContext';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import NotesPage from './NotesPage';


import { API_URL } from './config';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  changePage = (event) => {
    this.setState({
      page: event.target.id
    })
  }

  displayLocation = () => {
    console.log(window.location.pathname)
  }

  logout = () => {
    this.setState({
      username: ''
    })
  }

  newTrick = (trickName) => {
    return fetch(`${API_URL}/api/auth/new`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        trick_name: trickName
      })
    })
  }

  saveNote = (note) => {
    const { leftFoot, rightFoot, selectedNote, selectedNoteId } = note;
    //console.log('note', note)
    /*const update = {
      username: this.state.username,
        noteId: selectedNoteId,
        trick_name: trick_name,
        leftFoot: leftFoot,
        rightFoot: rightFoot,
        note: note.note
    }
    console.log(update)*/
    return fetch(`${API_URL}/api/auth/save`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        noteId: selectedNoteId,
        trick_name: selectedNote,
        leftFoot: leftFoot,
        rightFoot: rightFoot,
        note: note.note
      })
    })
      .then(response => {
        if(!response.ok) {
          throw new Error(`Couldn't update note`)
        }
      })
  }

  deleteNote = (selectedNoteId) => {
    fetch(`${API_URL}/api/auth/delete`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        selectedNoteId: selectedNoteId
      })
    })
  }



  signUp = (username, email, password) => {
    console.log(username, email, password)
    return fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(`fetch didn't work`)
      }
      return res
    })
    .then(response => {
      return response.json()
    })
      .then(response => {
        return response;
      })
  }

  login = (username, password) => {
    console.log(username, password)

    fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => {
        
        if(!res.ok) {
          throw new Error(`fetch didn't work`)
        }
        return res.json()
      })
        .then(response => {
          localStorage.setItem('token', response.token)
          this.setState({
            username: response.username
          })
          return response
        })
        
    return fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(`fetch didn't work`)
      }
      //console.log('yay')
      return res.json()
    })
    .then(response => {
      localStorage.setItem('token', response.token)
      this.setState({
        username: username
      })
    })
  }

  componentDidMount() {

  }

  render() {
    const contextValue = {
      login: this.login,
      signUp: this.signUp,
      saveNote: this.saveNote,
      deleteNote: this.deleteNote,
      newTrick: this.newTrick,
      username: this.state.username
    }
    console.log('location', window.location.pathname)
    return (
      <appContext.Provider
        value={contextValue}>
        <div className="App">
          <div className='topnav'>
            <Link className='navLink' to='/' id='homepage' onClick={this.changePage}>Home Page</Link>
            {
              this.state.username || window.location.pathname == '/signuppage' ? null : <Link className='navLink' to='/signuppage' id='signup' onClick={this.changePage}>Sign Up Page</Link>
            }
            {
              this.state.username || window.location.pathname == '/loginpage' ? null : <Link className='navLink' to='/loginpage' id='login' onClick={this.changePage}>Login Page</Link>
            }
            {
              this.state.username ? <Link className='navLink' to='/' onClick={this.logout}>Log Out</Link> : null
            }
            {
              window.location.pathname !== '/notespage' ? <Link className='navLink' to='/notespage' id='notespage' onClick={this.changePage}>Notes</Link> : null
            }
          </div>
          <div className='MainPage'>
            <Route exact path={['/']}
              render={(props) => {
                return(
                  <HomePage {...props} />
                )
              }}/>
            <Route exact path={['/loginpage']}
            render={(props) => {
              return(
                <LoginPage {...props} />
              )
            }}/>
            <Route exact path={['/signuppage']}
              render={(props) => {
                return(
                  <SignUpPage {...props} />
                )
              }}/>
            <Route exact path={['/notespage']}
            render={(props) => {
              return(
                <NotesPage {...props} />
              )
            }}/>
          </div>
        </div>
      </appContext.Provider>
    );
  }
  
}

export default App;
