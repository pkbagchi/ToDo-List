const express = require('express')
const router = express.Router()
const Todo = require('../models/tomodels')


router.get('/list/', async (req, res) => {
  try {
    const todolist = await Todo.find()
    res.json(todolist)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Updating One
router.put('/:id', getlist, async (req, res) => {
  if (req.body.title != null) {
    res.list.title = req.body.title
  }
  
  try {
    const updatedlist = await res.list.save()
    res.json({message: 'Successfully updated'})
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Creating one
router.post('/create/', async (req, res) => {
  const todolist = new Todo({
    title: req.body.title,
    
  })
  try {
    const newtodo = await todolist.save()
    res.status(201).json({message: 'Successfully Submitted to DB'})
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// Deleting One
router.delete('/:id', getlist, async (req, res) => {
  try {
    await res.list.remove()
    res.json({ message: 'Delete Successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})




async function getlist(req, res, next) {
    let list
    try {
      list = await Todo.findById(req.params.id)
      if (list == null) {
        return res.status(404).json({ message: 'Cannot find list' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.list = list
    next()
  }



module.exports = router