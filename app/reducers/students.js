import axios from 'axios'

const GET_STUDENTS = 'GET_STUDENTS'
const DELETE_STUDENT = 'DELETE_STUDENT'
const CREATE_STUDENT = 'CREATE_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'


export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

export function deleteStudent (studentId) {
  const action = { type: DELETE_STUDENT, studentId };
  return action;
}

export function createStudent (student) {
  const action = { type: CREATE_STUDENT, student }
  return action
}

export function updateStudent (student) {
  const action = { type: UPDATE_STUDENT, student }
  return action
}

export default function students(state = [], action) {

  let newState = state.slice() // this is for the update case

  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    case DELETE_STUDENT:
      return state.filter(student => {
        return student.id !== +action.studentId
      })
    case CREATE_STUDENT:
      return [...state, action.student]
    case UPDATE_STUDENT:
      newState.forEach(student => {
        if (student.id === action.student.id) {
          student = action.student
        }
      })
      return newState
    default:
      return state;
  }
}

export function fetchStudents() {
  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}

export function deleteStudentThunk (studentId) {
  return function thunk (dispatch) {
    return axios.delete(`/api/students/${studentId}`)
      .then(() => {
        const action = deleteStudent(studentId)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}

export function addStudent (student, history) {
  return function thunk (dispatch) {
    return axios.post('/api/students', student)
      .then(student => student.data)
      .then(student => {
        const action = createStudent(student)
        dispatch(action)
        history.push(`/students/${student.id}`)
      })
      .catch(err => console.error(err))
  }
}

export function updateStudentThunkCreator (student, history) {
  return function thunk (dispatch) {
    return axios.put(`/api/students/${student.id}`, student)
      .then(student => student.data)
      .then(student => {
        const action = updateStudent(student)
        dispatch(action)
        history.push(`/students/${student.id}`)
      })
      .catch(err => console.error(err))
  }
}
