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
  .catch(err => console.error(err))
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
  .catch(err => console.error(err))
});

router.get('/:studentId', (req, res) => {
  res.json(req.student)
})

router.post('/', (req, res, next) => {
  Student.findOrCreate({
    where: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
  })
    .spread(student => student)
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

})

router.put('/:studentId', (req, res, next) => {
  const id = req.params.studentId
  Student.findById(id)
    .then(student => {
      student.update(req.body)
      return Campus.findOne({
        where: {
          name: req.body.campus
        }
      })
        .then(campus => {
          student.setCampus(campus)
          return student
        })
    })
    .then((student) => res.json(student))
    .catch(err => console.error(err))
})

router.delete('/:studentId', (req, res, next) => {
  const id = req.params.studentId
  Student.destroy({ where: { id } })
    .then(() => res.sendStatus(204))
    .catch(err => console.error(err))
})
