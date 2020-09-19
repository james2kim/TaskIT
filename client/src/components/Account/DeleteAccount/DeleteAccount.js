import React from 'react'
import axios from 'axios'

import styles from './DeleteAccount.module.css'
import Backdrop from './Backdrop/Backdrop'

const DeleteAccount = (props) => {

    const {showModal,
        hideModalHandler, 
        userToken} = props


    const deleteAccountHandler = async (event) => {
        try {
            await axios({
                method:'delete',
                url:'http://localhost:3001/users/me',
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
           
            props.history.push('/')
        } catch (err) {
            console.log('Not able to delete')
        }
    }

    return (
        <div>
            <Backdrop showModal={showModal} clicked={hideModalHandler} />
            <div
                className={styles.DeleteAccount}
                style={{
                    transform: showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: showModal ? '1' : '0'
                }}>
                    <h4>Delete Account?</h4>
                    <p>Deleting an account is permanent. Do you still want to proceed?</p>
                    <div className={styles.ButtonSpacing}>
                    <form onSubmit={deleteAccountHandler}>
                            <button className={styles.DeleteButton}>Yes</button>
                    </form>
                    <button className={styles.RevertButton} onClick={hideModalHandler}>No</button>
                    </div>
            </div>
        </div>
    )
}

export default DeleteAccount