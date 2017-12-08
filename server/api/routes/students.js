'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../../db/models')
const Student = models.Student
const Campus = models.Campus
module.exports = router

router.get('/', (req, res, next) => [
  Student.findAll({
    include: [{
      model: Campus,
      as: 'campus'
    }]
  })
  .then(students => res.json(students))
  .catch(next)
])

router.param('studentId', function (req, res, next, id) {
  Student.findAll({
    where: {
      id
    },
    include: [{
      model: Campus,
      as: 'campus'
    }]
  })
  .then(student => {
    if (!student) {
      const err = Error('Student not found');
      err.status = 404;
      throw err
    }
    req.student = student;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next);
});

router.get('/:studentId', (req, res) => {
  res.json(req.student)
})

router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then((student) => {
      Campus.findOne({
        where: {
          name: req.body.campus
        }
      })
      .then(campus => {
        student.setCampus(campus)
      })
      .then(res.json(student))
    })
    .catch(err => console.error(err))

// NEED TO ADDRESS: WHAT IF THE STUDENT ALREADY EXISTS - use student.findorcreate?
})

router.put('/:studentId', (req, res, next) => {
  const id = req.params.studentId
  Student.findById(id)
    .then(student => {
      student.update(req.body)
      Campus.findOne({
        where: {
          name: req.body.campus
        }
      })
      .then(campus => {
        student.setCampus(campus)
      })
    })
    .then(() => res.status(200).send('student updated'))
    .catch(next)
})

router.delete('/:studentId', (req, res, next) => {
  const id = req.params.studentId
  Student.destroy({ where: { id } })
    .then(() => res.sendStatus(204))
    .catch(next)
})
