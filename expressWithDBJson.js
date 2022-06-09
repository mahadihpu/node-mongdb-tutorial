const express = require('express')
const router = express.Router()
const db = require('./db')

const addStudents = (req, res) => {
  db.getDStudents().then((students) => {
    students.push(req.body)
    db.addDStudents(students).then((data) => {
      res.send(student)
    })
  })
}

const studentDetails = (req, res) => {
  //reading db data from file
  db.getDStudents().then((students) => {
    res.send(students)
  })
}

const singleStudentData = (req, res) => {
  const reqID = parseInt(req.params.id)
  db.getDStudents().then((students) => {
    const resp = students.find((student) => student.id === reqID)
    if (!resp) res.status(404).send('Data Not Found')
    else res.send(resp)
  })
}

const updateData = (req, res) => {
  const id = parseInt(req.params.id)
  const updatedData = req.body
  db.getDStudents().then((students) => {
    const resp = students.find((student) => student.id === id)
    if (!resp) res.status(404).send('Data Not Found')
    else {
      const i = students.findIndex((student) => student.id === id)
      students[i] = updatedData
      db.addDStudents(students).then((data) => {
        res.send(updatedData)
      })
    }
  })
}

const deleteData = (req, res) => {
  const id = parseInt(req.params.id)
  db.getDStudents().then((students) => {
    const resp = students.find((student) => student.id === id)
    if (!resp) res.status(404).send('Data Not Found')
    else {
      const updatedData = students.filter((student) => student.id !== id)
      db.addDStudents(updatedData).then((data) => {
        res.send(`No ${id} was deleted Successfully`)
      })
    }
  })
}

router.get('/', studentDetails)

router.post('/', addStudents)

// //GET INDIVISUAL DATA

router.get('/:id', singleStudentData)

// //update data
router.put('/:id', updateData)

// //delete data
router.delete('/:id', deleteData)

module.exports = router
