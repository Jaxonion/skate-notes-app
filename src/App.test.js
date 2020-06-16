import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import NotesPage from './NotesPage';
import SignUpPage from './SignUpPage';


it ('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it ('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><HomePage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it ('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><LoginPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it ('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><NotesPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it ('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><SignUpPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})


