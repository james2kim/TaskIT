import React from 'react'

import styles from './UpdateAccount.module.css'
import Axios from 'axios'

const Account = (props) => {

    const redirectToLogin = () => {
        props.history.push('/account')
    }

    const updateAccountHandler = async (event) => {
        event.preventDefault()
        try {
                await Axios({
                method:'patch',
                url:'http://localhost:3001/users/me',
                headers: {
                    Authorization: `Bearer ${props.userToken}`
                },
                data: {
                    name: props.nameValue,
                    email:props.emailValue,
                    password:props.passwordValue
                }
            })
            props.setAuthUserEmail(props.emailValue)
            props.setAuthUserName(props.nameValue)
            props.history.push('/account')
        } catch (err) {
           console.log('Unable to update account.')
        }
    }

    return (
        <div className={styles.UpdateAccount}>
            <h1>Update Account</h1>
            <p>Update One, Two, or All Fields </p>
                <form onSubmit={updateAccountHandler}>
                    <input type="text" name="name" placeholder="Name" onChange={props.handleNameChange}/>   
                    <input type="email" name="email" placeholder="Email" onChange={props.handleEmailChange} />
                    <input type="password" name="password" placeholder="Password must be 7 characters min" onChange={props.handlePasswordChange}/>
                    <button>Update Information</button>
                    <p className={styles.Cursor} onClick={redirectToLogin}>Nothing to Update.</p>
                </form>
                {props.error}
        </div>
    )
}

export default Account