import React, {useEffect} from 'react'
import styles from './Account.module.css'
import DeleteAccount from './DeleteAccount/DeleteAccount'

const Account = (props) => {

    const {readProfileHandler, 
        showModal, 
        showModalHandler, 
        hideModalHandler, 
        userToken, 
        authUserName,
        authUserEmail,
        authUserPassword,
        authUserUpdateAt} = props

    useEffect(() => {
        readProfileHandler()
    }, [readProfileHandler])

    return (
        <div className={styles.AccountContainer}>     
            <DeleteAccount
                {...props}
                showModal={showModal}
                hideModalHandler={hideModalHandler}
                userToken={userToken} />
            <div className={styles.Account}>
                <h1>Account Information</h1>
                <div className={styles.Data}>
                    <p className={styles.Information}><strong>Name:</strong> {authUserName}</p>
                    <p className={styles.Information}><strong>Email:   </strong> {authUserEmail}</p>
                    <p className={styles.Information}><strong>Password:   </strong> {authUserPassword}</p>
                    <p className={styles.UpdatedAt}>Last Updated {authUserUpdateAt} </p>
                </div>
                <div className={styles.ButtonSpacing}>
                    <button onClick={() => props.history.push('/account/update')} className={styles.UpdateButton}>Update Account Info</button>
                    <button onClick={showModalHandler} className={styles.DeleteButton}>Delete Account</button>
                </div>
            </div>        
        </div>
    )
}

export default Account