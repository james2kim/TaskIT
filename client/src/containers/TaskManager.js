import React, {useState, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import axios from 'axios'
import Toolbar from '../components/Navbar/Navbar'
import Home from '../components/Home/Home'
import Login from '../components/Auth/Login/Login'
import Signup from '../components/Auth/Signup/Signup'
import Application from '../components/Application/Application'
import Account from '../components/Account/Account'
import UpdateAccount from '../components/Account/UpdateAccount/UpdateAccount'
import NewTask from '../components/Application/NewTask/NewTask'
import UpdateTask from '../components/Application/UpdateTask/UpdateTask'

const TaskManager = (props) => {

    // Authentication Related State
    const [isAuth, setIsAuth] = useState(false)
    const [error, setError] = useState('')
    const [userToken, setUserToken] = useState('')

    // Login/Signup Related State 
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [nameValue, setNameValue] = useState('')

    // Account Related State
    const [authUserName, setAuthUserName] = useState('')
    const [authUserEmail, setAuthUserEmail] = useState('')
    const [authUserUpdateAt, setAuthUserUpdateAt] = useState('')
    const [authUserPassword, setAuthUserPassword] = useState('')

    // Modal Related State
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState('initial')

    // New Task Related State
    const [newTaskValue, setNewTaskValue] = useState('')
    const [newTaskPriority, setNewTaskPriority] = useState('')
    const [newTaskCompleted, setNewTaskCompleted] = useState(false)

    // Tasks Related State
    const [allCompletedTasks, setAllCompletedTasks] = useState(false)
    const [allIncompleteTasks, setAllIncompleteTasks] = useState(false)

    // Update Task Related State
    const [curTaskDesc, setCurTaskDesc] = useState('')
    const [curTaskPriority, setCurTaskPriority] = useState('')
    const [curTaskComplete, setCurTaskComplete] = useState('')
    const [curTaskID, setCurTaskID] = useState('')
   

    useEffect(() => {
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
          window.location.href = window.location.origin
        }
        
        }, [])


    // User Information Handlers 


    const handleNameChange = (event) => {
        setNameValue(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value)
    }

// Task Handlers

    const handleNewTaskChange = event => {
        setNewTaskValue(event.target.value)
    }

    const handleNewPriorityChange = event => {
        setNewTaskPriority(+event.target.value)
    }

    const handleNewCompletedChange = event => {
        setNewTaskCompleted(event.target.value === 'true')
    }

    const handleUpdateTaskChange = event => {
        setCurTaskDesc(event.target.value)
    }

    const handleUpdatePriorityChange = event => {
        setCurTaskPriority(+event.target.value)
    }

    const handleUpdateCompletedChange = event => {
        setCurTaskComplete(event.target.value === 'true')
    }

    // Modal Related Handlers

    const showModalHandler = () => {
        setShowModal(true)
    }

    const hideModalHandler = () => {
        setShowModal(false)
    }
 
    // Logout Handler Function 
    const logoutUserHandler = async () => {
        try {
            const response = await axios({
                method:'post',
                url:'/users/logout',
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            console.log(response.status)
            setIsAuth(false)
            setUserToken('')
            setEmailValue('')
            setPasswordValue('')
            setNameValue('')
            setAuthUserName('')
            setAuthUserEmail('')
            setAuthUserPassword('')
            setAuthUserUpdateAt('')

        } catch (err) {
            console.log('Something Went Wrong')
        }
    }

    // Read User Profile Function

    const readProfileHandler = async () => {
        try {
            const response = await axios({
                method:'get',
                url:'/users/me',
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })

            setAuthUserName(response.data.name)
            setAuthUserEmail(response.data.email)
            setAuthUserUpdateAt(new Date(response.data.updatedAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}))
            setAuthUserPassword('*******')
        } catch (err) {
            alert('Something Went Wrong.')
        }
    }

    let routes = (
        <Switch>
            <Route path="/login" render={(props) => 
                <Login 
                    {...props}
                    setIsAuth={setIsAuth} 
                    passwordValue={passwordValue}
                    emailValue={emailValue}
                    handleEmailChange={handleEmailChange}
                    handlePasswordChange={handlePasswordChange}
                    error={error} 
                    setError={setError} 
                    setUserToken={setUserToken}/>} />
            <Route path="/signup" render={(props) => 
                <Signup 
                    {...props}
                    setIsAuth={setIsAuth} 
                    nameValue={nameValue}
                    emailValue={emailValue}
                    passwordValue={passwordValue}
                    handleNameChange={handleNameChange}
                    handleEmailChange={handleEmailChange}
                    handlePasswordChange={handlePasswordChange}
                    error={error} 
                    setError={setError}
                    setUserToken={setUserToken}/> }/>
             <Route path="/" component={Home} />
             <Redirect to="/" />
        </Switch>
    )

    if (isAuth) {
        routes = (
            <Switch>
            <Route path="/application/update" render={(props) => 
                 <UpdateTask 
                     {...props}
                     loading={loading}
                     setLoading={setLoading}
                     userToken={userToken}
                     curTaskPriority={curTaskPriority}
                     curTaskDesc={curTaskDesc}
                     curTaskComplete={curTaskComplete}
                     curTaskID={curTaskID}
                     handleUpdateTaskChange={handleUpdateTaskChange}
                     handleUpdatePriorityChange={handleUpdatePriorityChange}
                     handleUpdateCompletedChange={handleUpdateCompletedChange}/>
             }/>  
            <Route path="/application/new" render={(props) => 
                 <NewTask
                     {...props}
                     newTaskValue={newTaskValue}
                     handleNewTaskChange={handleNewTaskChange}
                     newTaskPriority={newTaskPriority}
                     handleNewPriorityChange={handleNewPriorityChange}
                     newTaskCompleted={newTaskCompleted}
                     handleNewCompletedChange={handleNewCompletedChange}
                     userToken={userToken} 
                     setNewTaskValue={setNewTaskValue}
                     setNewTaskPriority={setNewTaskPriority}
                     setNewTaskCompleted={setNewTaskCompleted}/>
             }/> 
             <Route path="/application"  render={(props) => 
                 <Application 
                     {...props}  
                     allCompletedTasks={allCompletedTasks}
                     setAllCompletedTasks={setAllCompletedTasks}
                     allIncompleteTasks={allIncompleteTasks}
                     userToken={userToken}
                     setAllIncompleteTasks={setAllIncompleteTasks}
                     setLoading={setLoading}
                     setCurTaskPriority={setCurTaskPriority}
                     setCurTaskDesc={setCurTaskDesc}
                     setCurTaskComplete={setCurTaskComplete}
                     setCurTaskID={setCurTaskID}/>} />
 
            <Route path="/account/update" render={(props) => 
                 <UpdateAccount 
                     {...props}
                     nameValue={nameValue}
                     emailValue={emailValue}
                     passwordValue={passwordValue}
                     userToken={userToken}
                     setAuthUserName={setAuthUserName}
                     setAuthUserEmail={setAuthUserEmail}
                     handleNameChange={handleNameChange}
                     handleEmailChange={handleEmailChange}
                     handlePasswordChange={handlePasswordChange}/>} /> 
             <Route path="/account" render={(props) => 
                 <Account 
                     {...props}
                     authUserName={authUserName}
                     authUserEmail={authUserEmail}
                     userToken={userToken}
                     authUserPassword={authUserPassword} 
                     authUserUpdateAt={authUserUpdateAt}
                     showModal={showModal}
                     showModalHandler={showModalHandler}
                     hideModalHandler={hideModalHandler}
                     readProfileHandler={readProfileHandler}/>} /> 
             <Redirect to="/" />
         </Switch>
        )
    }

    // Returns the Toolbar and all route handlers for the application
    return (
        <div>
        <Toolbar 
            isAuth={isAuth} 
            logoutUserHandler={logoutUserHandler} 
            readProfileHandler={readProfileHandler}
            userToken={userToken}
            {...props}/>
            {routes}
        </div>
    )
}

export default TaskManager
