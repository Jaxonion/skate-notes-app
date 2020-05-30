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

    }
  }

  displayLocation = () => {
    console.log(window.location.pathname)
  }

  saveNote = (note) => {
    console.log(note)
  }

  signUp = (username, email, password) => {
    console.log(username, email, password)
  }

  login = (username, password) => {
    console.log(username, password)
  }

  componentDidMount() {

  }

  render() {
    const contextValue = {
      signUp: this.signUp,
      login: this.login,
      saveNote: this.saveNote
    }
    console.log('location', window.location.pathname)
    return (
      <appContext.Provider
        value={contextValue}>
        <div className="App">
          <div className='topnav'>
            <Link className='navLink' to='/'>Home Page</Link>
            <Link className='navLink' to='/loginpage'>Login Page</Link>
            <Link className='navLink' to='/signuppage'>Sign Up Page</Link>
            <Link className='navLink' to='/notespage'>Notes</Link>
            
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
