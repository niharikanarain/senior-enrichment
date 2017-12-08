import React from 'react';
import { addStudent } from '../reducers'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (evt) => {
      evt.preventDefault()
      const student = {
        firstName: evt.target.studentFirstName.value,
        lastName: evt.target.studentLastName.value,
        campus: evt.target.studentCampus.value
      }
      const addThunk = addStudent(student)
      dispatch(addThunk)
    }
  }
}

const NewStudentContainer = connect(null, mapDispatchToProps)(NewStudent)


function NewStudent (props) {
  return (
    <form onSubmit={ props.handleSubmit }>
      <label> Add Student </label>
      <div>
        <input
        type="text"
        name="studentFirstName"
        placeholder="Enter student's first name"
        />
      </div>
      <div>
        <input
        type="text"
        name="studentLastName"
        placeholder="Enter student's last name"
        />
      </div>
      <div>
        <input
        type="text"
        name="studentCampus"
        placeholder="Enter student's campus"
        />
      </div>
        <button type="submit">Submit</button>
  </form>
  )
}

export default NewStudentContainer
