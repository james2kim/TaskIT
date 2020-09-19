import React from 'react'
import axios from 'axios'
import styles from './Signup.module.css'

const Signup = (props) => {
    
    // Signup function to add new user to database, and authenticates
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (props.passwordValue.length < 7) {
            return props.setError('Password must be a minimum of 7 characters')
        }

        try {
            const response = await axios.post('/users', {
                name: props.nameValue,
                email: props.emailValue,
                password:props.passwordValue
            })

            props.setIsAuth(true)
            props.setUserToken(response.data.token)    
    
            if (response.status === 201) {
                props.history.push('/application')
            } else {
               alert('Unable to Signup')
            }
        } catch(err) {
            props.setError('Email is in use. Try another email.')
        }
    }

    const redirectToLogin = () => {
        props.history.push('/login')
    }

    return (
            <div className={styles.Signup}>
                <h1>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <input value={props.nameValue}type="text" name="name" placeholder="Name" onChange={props.handleNameChange}/>
                    <input value={props.emailValue} type="email" name="email" placeholder="Email" onChange={props.handleEmailChange} />
                    <input value={props.passwordValue} type="password" name="password" placeholder="Password" onChange={props.handlePasswordChange}/>
                    <button>Sign Up</button>
                    <p onClick={redirectToLogin}>Already Signed Up? Login here.</p>
                </form>
                {props.error}
            </div>
    )
}

export default Signup