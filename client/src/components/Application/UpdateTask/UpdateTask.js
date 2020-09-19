import React  from 'react'
import axios from 'axios'

import styles from './UpdateTask.module.css'

const UpdateTask = props => {

    // Updates information about specific task 
    const updateTaskHandler = async (event) => {
        event.preventDefault()
        await axios({
            method:'patch',
            url:`/tasks/${props.curTaskID}`,
            headers: {
                Authorization: `Bearer ${props.userToken}`
            },
            data: {
                description: props.curTaskDesc,
                priority: props.curTaskPriority,
                completed: props.curTaskComplete
            }
        })
        props.history.push('/application')
    }


    if (props.loading === 'initial') {
        return <h2 className={styles.UpdateTask}>Initializing</h2>
    }

    if (props.loading === 'true') {
        return <h2 className={styles.UpdateTask}>Loading....</h2>
    } 

    let completeJSX
    if (props.curTaskComplete) {
        completeJSX = <select name="completed" value={props.curTaskComplete} onChange={props.handleUpdateCompletedChange}>
                <option value={true}>Complete</option>
                <option value={false}>Incomplete</option>
              </select>
    } else {
        completeJSX = <select name="completed" value={props.curTaskComplete} onChange={props.handleUpdateCompletedChange}>
                <option value={false}>Incomplete</option>
                <option value={true}>Complete</option>
              </select>
    }

    return (
        <div className={styles.UpdateTask}>
            <h1>Update Task</h1>
            <form onSubmit={updateTaskHandler}>
                <input value={props.curTaskDesc} type="text" name="description" onChange={props.handleUpdateTaskChange}/>
                <select name="priority" value={props.curTaskPriority} onChange={props.handleUpdatePriorityChange}>
                    <option value={1}>Critical Importance</option>
                    <option value={2}>Important</option>
                    <option value={3}>Mildly Important</option>
                </select>
                {completeJSX}
                <button>Update Task</button>
            </form>
            <p onClick={() => props.history.push('/application')}>Back to Application.</p>
        </div>
    )
}

export default UpdateTask