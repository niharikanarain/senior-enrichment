import React from 'react';
import { addStudent } from '../reducers'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return { campuses: state.campuses }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (evt) => {
      evt.preventDefault()
      const student = {
        firstName: evt.target.studentFirstName.value,
        lastName: evt.target.studentLastName.value,
        campus: evt.target.studentCampus.value,
        email: evt.target.studentEmail.value
      }
      const addThunk = addStudent(student, ownProps.history)
      dispatch(addThunk)
    }
  }
}

const NewStudentContainer = connect(mapStateToProps, mapDispatchToProps)(NewStudent)


function NewStudent (props) {

  const campuses = props.campuses

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
        name="studentEmail"
        placeholder="Enter student's email"
        />
      </div>
      <div>
        <select name="studentCampus">
          {
            campuses.map(campus =>
            <option key={ campus.id} value={ campus.name}>{ campus.name }</option>)
          }
        </select>
      </div>
        <button type="submit">Submit</button>
  </form>
  )
}

export default NewStudentContainer
