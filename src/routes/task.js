const express = require('express')
const Task = require('../models/task')
const auth = require ('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        author: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sort=createdAt:asc
router.get('/tasks', auth, async (req ,res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.priority) {
        if (req.query.priority === '3') {
            match.priority = 3
        } else if (req.query.priority === '2') {
            match.priority = 2
        } else if (req.query.priority === '1') {
            match.priority = 1
        }
    }

    if (req.query.sort) {
        const [sortCriteria, sortMethod] = req.query.sort.split(':')
        sort[sortCriteria]= sortMethod === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path:'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {

    const id = req.params.id
    try {
        const task = await Task.findOne({_id:id, author: req.user._id})
        ! task ? res.status(404).send() : res.send(task)   
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed', 'priority']
    const isValidOp = updates.every(update => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOp) {
        return res.status(400).send({error: 'Invalid Updates'})
    }

    try {
        const task = await Task.findOne({_id: req.params.id, author:req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(err) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, author:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports = router

