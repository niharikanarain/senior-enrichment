'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../../db/models')
const Campus = models.Campus
const Student = models.Student

module.exports = router

router.get('/', (req, res, next) => [
  Campus.findAll()
  .then(campuses => res.json(campuses))
  .catch(next)
])

router.param('campusId', function (req, res, next, id) {
  Campus.findAll({
    where: {
      id
    },
    include: [{
      model: Student,
      as: 'students'
    }]
  })
  .then(campus => {
    if (!campus) {
      const err = Error('Campus not found');
      err.status = 404;
      throw err
    }
    req.campus = campus;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next);
});

router.get('/:campusId', (req, res) => {
  res.json(req.campus)
})

router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then((campus) => {
      res.json(campus)
    })
    .catch(err => console.error(err))

// NEED TO ADDRESS: WHAT IF THE campus ALREADY EXISTS - use campus.findorcreate?
})

router.put('/:campusId', (req, res, next) => {
  const id = +req.params.campusId
  Campus.findById(id)
    .then(campus => {
      campus.update(req.body)
    })
    .then(() => res.status(200).send('campus updated'))
    .catch(next)
})

router.delete('/:campusId', (req, res, next) => {
  const id = +req.params.campusId
  Campus.destroy({ where: { id } })
    .then(() => res.sendStatus(204))
    .catch(next)
})
