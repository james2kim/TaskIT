import React from 'react'
import axios from 'axios'

import styles from './NewTask.module.css'

const NewTask = (props) => {

    // Adding New Task function to add new task to database
    const newTaskHandler = async (event) => {
        event.preventDefault()
        try {
            await axios({
                method:'post',
                url:'/tasks',
                headers: {
                    Authorization: `Bearer ${props.userToken}`
                },
                data: {
                    description: props.newTaskValue,
                    priority: props.newTaskPriority,
                    completed:props.newTaskCompleted
                }
            })
            props.setNewTaskValue('')
            props.setNewTaskPriority('')
            props.setNewTaskCompleted(false)
            props.history.push('/application')
        } catch (err) {
            console.log('Unable to Create Task')
        }
    }


    return (
        <div className={styles.NewTask}>
            <h1>New Task</h1>
            <form onSubmit={newTaskHandler}>
                <input required value={props.newTaskValue} type="text" name="description" placeholder="Write a Task Description" onChange={props.handleNewTaskChange} />
                <select name="priority" value={props.newTaskPriority} required onChange={props.handleNewPriorityChange}>
                    <option value=''>Choose Priority:</option>
                    <option value={1}>Critical Importance</option>
                    <option value={2}>Important</option>
                    <option value={3}>Mildly Important</option>
                </select>
                <select name="completed" value={props.newTaskCompleted} onChange={props.handleNewCompletedChange}>
                    <option value='' style={{color:'#ccc'}}>Optional: Task Completed?</option>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <button>Create</button>
                
            </form>
            <p onClick={() => props.history.push('/application')}>Back to Application.</p>
        </div>
    )
}

export default NewTask