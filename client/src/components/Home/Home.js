import React from 'react'
import styles from './Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = (props) => {
    const routeToSignup = () => {
        props.history.push('/signup')
    }
    return (
        <div className={styles.Home}>
            <div className={styles.Content}>
                <h1>TaskIT</h1>
                <h3>Premium Task Manager</h3>
                <p>Prioritize your tasks more efficiently <FontAwesomeIcon icon={['fas', 'check']} /></p>
                <hr />
                <button onClick={routeToSignup}>Signup</button>
            </div>
        </div>
    )
}

export default Home