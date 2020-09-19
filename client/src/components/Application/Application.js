import React, {useState,useEffect} from 'react'
// import ReactDOM from 'react-dom'
import axios from 'axios'
import styles from './Application.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Application = (props) => {
   
    // Loading state to minimize memory leaks from changing state on an unmounted component 
    const [loading, setLoading] = useState('initial')


    useEffect(() => {
        setLoading('true')
        // Read Task function to retrieve tasks from database 
        const readTasksHandler = async () => {
            try {
                const completedTasks = await axios({
                    method:'get',
                    url:'/tasks?completed=true&&sort=updatedAt:desc',
                    headers: {
                        Authorization: `Bearer ${props.userToken}`
                    }
                })
                
                const incompleteTasks = await axios({
                    method:'get',
                    url:'/tasks?completed=false&&limit=5&&sort=priority:asc',
                    headers: {
                        Authorization: `Bearer ${props.userToken}`
                    }
                })
    
                //  Memoization like technique to reduce changes in State when no tasks have been added, removed or changed 

                if (JSON.stringify(completedTasks.data) !== JSON.stringify(props.allCompletedTasks)) {
                    props.setAllCompletedTasks(completedTasks.data)
                } 
           
                if (JSON.stringify(incompleteTasks.data) !== JSON.stringify(props.allIncompleteTasks)) {
                    props.setAllIncompleteTasks(incompleteTasks.data)
                }
                setLoading('false')
            } catch (err) {
                alert('Unable To Retrieve Tasks')
            }
        }
        readTasksHandler()
    }, [props])


    //  To minimize memory leaks from asynchronous call to Express API on unmounted component 
    if (loading === 'initial') {
        return <h2>Initializing</h2>
    }

    if (loading === 'true') {
        return <h2>Loading....</h2>
    }

    // Helper functions for Application UI
    const convertPriority = priority => {
        if (priority === 1) {
            return 'Critical'
        } else if (priority === 2) {
            return 'Moderate'
        } else {
            return 'Mild'
        }
    }

    const stylePriorityBackground = priority => {
        if (priority === 1) {
            return '#DC143C'
        } else if (priority === 2) {
            return '#FF8C00'
        } else {
            return '#F4A460'
        }
    }

    //  Delete Task function to delete task from database, and ultimately the UI

    const deleteTaskHandler = async (_id, author) => {
        try {
            const request = await axios({
                method:'delete',
                url: `/tasks/${_id}`,
                headers: {
                    Authorization: `Bearer ${props.userToken}`
                },
                data: {
                    _id,
                    author
                }
            })
            console.log(request)
            props.history.push('/application')
          
        } catch (err) {
            console.log('Unable to Delete Task')
        }
    }


    // Read Task function to get information (id, author, etc) on a specific task, primarily as helper function to the Update Task function 
    const readTaskHandler = async (_id, author) => {
        props.history.push('/application/update')
        props.setLoading('true')
        try {
            const request = await axios({
                method:'get',
                url: `/tasks/${_id}`,
                headers: {
                    Authorization: `Bearer ${props.userToken}`
                },
                data: {
                    _id,
                    author
                }
            })
            
            props.setCurTaskPriority(request.data.priority)
            props.setCurTaskDesc(request.data.description)
            props.setCurTaskComplete(request.data.completed)
            props.setCurTaskID(request.data._id)
            props.setLoading('false')
          
        } catch (err) {
            console.log('Unable to Read Task')
        }
    }


    // Application page compartmentalizes between finished and unfinished tasks 

    return (
        <div className={styles.Container}>
            <div>
                <button className={styles.TopCorner} onClick={() => props.history.push('/application/new')}>New Task <FontAwesomeIcon icon={['fas', 'plus-circle']} /></button>
            </div>
            <div className={styles.Application}>
                <div>
                    <h3 className={styles.TaskHeader}>Unfinished Tasks</h3>
                    { props.allIncompleteTasks ? props.allIncompleteTasks.map((task, index) => {
                    return <div key={task._id} 
                                className={styles.Task} 
                                style={{backgroundColor: stylePriorityBackground(task.priority), color:'white' }}>
                                <p 
                                    className={styles.Trash}
                                    onClick={() => deleteTaskHandler(task._id, task.author)} ><FontAwesomeIcon icon={['fas', 'trash']} /></p>
                                <p>{task.description}</p>
                                <p>Priority: {convertPriority(task.priority)}</p>
                                <p className={styles.Update}>Last Updated: {new Date(task.updatedAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
                                <p 
                                    className={styles.Edit}
                                    onClick={() => readTaskHandler(task._id, task.author)}><FontAwesomeIcon icon={['fas', 'pen']} /></p>
                            </div> })  : null  } 
                </div>
                <div>
                    <h3 className={styles.TaskHeader}>Completed Tasks</h3>
                    { props.allCompletedTasks ? props.allCompletedTasks.map((task, index) => {
                    return <div key={task._id} 
                                className={styles.Task} 
                                style={{backgroundColor:'#7CFC00'}}>
                                <p 
                                    className={styles.Trash} 
                                    onClick={() => deleteTaskHandler(task._id, task.author)} ><FontAwesomeIcon icon={['fas', 'trash']} /></p>
                                <p>{task.description}</p>
                                <p>Priority: {convertPriority(task.priority)}</p>
                                <p className={styles.Update}> Last Updated: {new Date(task.updatedAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
                                <p 
                                    className={styles.Edit}
                                    onClick={() => readTaskHandler(task._id, task.author)}><FontAwesomeIcon icon={['fas', 'pen']} /></p>
                            </div> }) : null} 
                </div>
            </div>
        </div>

    )
}
export default Application