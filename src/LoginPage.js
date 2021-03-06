import React from 'react';
import appContext from './appContext';

class LoginPage extends React.Component {
    static contextType = appContext;
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    changeState = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login = (event) => {
        event.preventDefault();
        this.context.login(this.state.username, this.state.password)
            .then(response => {
                this.props.history.push('/')
            })
                .catch(err => {
                    alert('wrong credentials')
                })
    }

    render() {
        return(
            <div className='LoginPage'>
                <h1 className='title'>Login Page</h1>
                <form className='loginForm' onSubmit={this.login}>
                    <input className='inputField' type='text' placeholder='username: jordan' name='username' id='loginUsername' value={this.state.username} onChange={this.changeState} />
                    <input className='inputField' type='password' placeholder='password: Jordan1!' name='password' id='loginPassword' value={this.state.password} onChange={this.changeState} />
                    <button
                        className='submitButton'
                        type='submit'>
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginPage;