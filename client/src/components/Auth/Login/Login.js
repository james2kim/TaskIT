import React from 'react'
import axios from 'axios'
import styles from './Login.module.css'


const Login = (props) => {

    // Login Request Function to Authenticate Existing Users
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('/users/login', {
                email: props.emailValue,
                password: props.passwordValue
            })
        
            props.setIsAuth(true)
            props.setUserToken(response.data.token)

              if (response.status === 200) {
                  props.history.push('/application')
              } else {
                  alert('Unable to Login')
              }
        } catch (err) {
            props.setError('Invalid Credentials. Unable to Login.')
        }
    }


        const redirectToLogin = () => {
            props.history.push('/signup')
        }

        return (
                <div className={styles.Login}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input value={props.emailValue} type="email" name="email" placeholder="Email" onChange={props.handleEmailChange} />
                        <input value={props.passwordValue} type="password" name="password" placeholder="Password" onChange={props.handlePasswordChange}/>
                        <button>Login</button>
                        <p onClick={redirectToLogin}>Not Registered? Sign up here.</p>
                    </form>
                    {props.error}
                </div>
        )
}

export default Login