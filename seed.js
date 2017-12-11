const db = require('./server/db/index')
const Student = require('./server/db/models/student')
const Campus = require('./server/db/models/campus')

const campuses = [
  { name: 'Main', imageURL: 'https://news.illinois.edu/blog/files/6367/552545/118108.jpg', description: 'Main Quad'},
  { name: 'Engineering', imageURL: 'https://i.pinimg.com/736x/0e/8a/6a/0e8a6afaed5c9f1f2c0020e173d0ce8b--quad-engineering.jpg', description: 'Engineer Campus or Bardeen Quad'},
  { name: 'Business', imageURL: 'http://mw2.google.com/mw-panoramio/photos/medium/73396646.jpg', description: 'Business Campus or South Quad'},
  { name: 'Social', imageURL: 'http://www.brothersbar.com/wp-content/uploads/2015/10/GALLERY-Champaign.jpg', description: 'Green Street'},
]

const students = [
  { firstName: 'Patrick', lastName: 'Dempsey', email: 'pat@uiuc.edu', gpa: 2, campusId: 1},
  { firstName: 'Priyanka', lastName: 'Chopra', email: 'pchops@uiuc.edu', gpa: 3, campusId: 1}, { firstName: 'Brad', lastName: 'Pitt', email: 'brad@uiuc.edu', gpa: 1, campusId: 2},
  { firstName: 'Tom', lastName: 'Hanks', email: 'tomH@uiuc.edu', gpa: 2, campusId: 2},
  { firstName: 'Kosha', lastName: 'Patel', email: 'kpat@uiuc.edu', gpa: 3, campusId: 3},
  { firstName: 'Jennifer', lastName: 'Garner', email: 'jgarn@uiuc.edu', gpa: 2, campusId: 3},
  { firstName: 'Hilary', lastName: 'Duff', email: 'hil@uiuc.edu', gpa: 2, campusId: 4},
  { firstName: 'Tom', lastName: 'Cruise', email: 'tCruise@uiuc.edu', gpa: 3, campusId: 4}
]

const seed = () =>
  Promise.all(campuses.map(campus =>
    Campus.create(campus)))
  .then(() =>
  Promise.all(students.map(student =>
    Student.create(student)
  )))
  .catch(err => console.error(err))

module.exports = {
  seed: seed
}
