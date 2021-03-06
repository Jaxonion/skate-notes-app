import React from 'react';
import appContext from './appContext';

class SignUpPage extends React.Component {
    static contextType = appContext;
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    signUp = (event) => {
        event.preventDefault();
        this.context.signUp(this.state.username, this.state.email, this.state.password)
            .then(response => {
                this.props.history.push('/loginpage')
            })
        this.setState({
            username: '',
            email: '',
            password: ''
        });
    }

    render() {
        return(
            <div className='SignUpPage'>
                <h1 className='title'>Sign Up Page</h1>
                <form className='signUpForm' onSubmit={this.signUp}>
                    <input className='inputField' type='text' placeholder='username' name='username' value={this.state.username} onChange={this.changeState} />
                    <input className='inputField' type='text' placeholder='email' name='email' value={this.state.email} onChange={this.changeState} />
                    <input className='inputField' type='password' placeholder='password' name='password' value={this.state.password} onChange={this.changeState} />
                    <button className='submitButton' type='submit'>
                        Sign Up
                    </button>
                </form>
            </div>
        )
    }
}

export default SignUpPage;