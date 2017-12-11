import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateStudentThunkCreator } from '../reducers/students'

const mapStateToProps = state => {
  return { campuses: state.campuses }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (evt) => {
      evt.preventDefault()

      let firstName = evt.target.firstName.value ? evt.target.firstName.value : evt.target.firstName.defaultValue

      let lastName = evt.target.lastName.value ? evt.target.lastName.value : evt.target.lastName.defaultValue

      let email = evt.target.email.value ? evt.target.email.value : evt.target.email.defaultValue

      let id = +evt.target.id

      let campus = evt.target.campus.value ? evt.target.campus.value : evt.target.campus.defaultValue

      const student = {
        firstName, lastName, email, id, campus
      }
      const updateThunk = updateStudentThunkCreator(student, ownProps.history)
      dispatch(updateThunk)
    }
  }
}

class EditStudent extends Component {

    constructor() {
      super()
      this.state = {
        student: {}
      }
      this.getStudent = this.getStudent.bind(this)
    }

    getStudent(studentId) {
      axios.get(`/api/students/${studentId}`)
        .then(res => {
          return res.data})
        .then(student => {
          this.setState({
            student: student[0]
          })
        })
        .catch(err => console.error(err))
    }

    componentDidMount () {
      const studentId = this.props.match.params.studentId
      this.getStudent(studentId)
    }

    render() {

      const student = this.state.student
      const campuses = this.props.campuses
      const studentCampusName = student.campus ? student.campus.name : 'No campus assigned currently'

      return (
        <form onSubmit={ this.props.handleSubmit } id={ student.id }>

          <h1> Edit Student Info </h1>

          <div>
            <label> Student First Name: </label>
            <input
            type="text"
            name="firstName"
            defaultValue={ student.firstName }
            placeholder={ student.firstName }
            />
          </div>

          <div>
          <label> Student Last Name: </label>
          <input
          type="text"
          name="lastName"
          defaultValue={ student.lastName }
          placeholder={ student.lastName }
          />
        </div>

          <div>
            <label> Email: </label>
            <input
            type="text"
            name="email"
            defaultValue={ student.email }
            placeholder={ student.email }
            />
          </div>

          <div>
            <label> Current Campus: { studentCampusName } </label>
            <div>
                <label> Update Campus: </label>
                <select
                name="campus"
                >
                    {
                      campuses.map(campus => (
                        <option
                        value={ campus.name }
                        key={ campus.id }>{ campus.name }</option>
                      ))
                    }
                </select>
            </div>
          </div>

          <div>
            <button> Submit </button>
          </div>
        </form>
      )
    }
  }

const EditStudentConnect = connect(mapStateToProps, mapDispatchToProps)(EditStudent)

export default EditStudentConnect
