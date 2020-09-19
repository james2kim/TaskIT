import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navbar.module.css'


const Toolbar = (props) => {
    let navbar
    if (props.isAuth) 
        {
          navbar = <ul>
                        <li><NavLink 
                                to="/account" 
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color:'#fa923f'
                                }}>Account</NavLink></li>
                        <li><NavLink 
                                to="/application" 
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color:'#fa923f'
                                }}>Application</NavLink></li>

                         <li onClick={props.logoutUserHandler}><NavLink 
                                to="/login"
                                activeClassName="my-active"
                                activeStyle={{
                                    color:'#fa923f'
                                }} >Logout </NavLink></li>                
                    </ul>

        } 
    else 
        {
            navbar = <ul>
                <li><NavLink 
                    to="/"
                    exact
                    activeClassName="my-active"
                    activeStyle={{
                        color:'#fa923f'
                }}>Home</NavLink></li>  

                <li><NavLink 
                    to="/login"
                    activeClassName="my-active"
                    activeStyle={{
                        color:'#fa923f'
                }}>Login</NavLink></li>  

                <li><NavLink 
                    to="/signup"
                    activeClassName="my-active"
                    activeStyle={{
                        color:'#fa923f'
                }}>Signup</NavLink></li>  
            </ul>
        }


    return (
        <div className={styles.Navbar}>    
            <header>
                <nav>
                    {navbar}
                </nav>
            </header>

        </div>
    )
}

export default Toolbar