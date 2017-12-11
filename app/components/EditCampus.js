import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCampusThunkCreator } from '../reducers/campuses'
import { updateStudentThunkCreator } from '../reducers/students'

const mapStateToProps = state => {
  return { students: state.students }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewStudentToCampus: (student) => {
      const updateThunk = updateStudentThunkCreator(student)
      return dispatch(updateThunk)
    },
    handleDeleteFromCampus: (student) => {
      const updateThunk = updateStudentThunkCreator(student)
      return dispatch(updateThunk)
    },
    handleSubmit: (evt) => {
      evt.preventDefault()

      let name = evt.target.campusName.value ? evt.target.campusName.value : evt.target.campusName.defaultValue

      let description = evt.target.description.value ? evt.target.description.value : evt.target.description.defaultValue

      let id = +evt.target.id

      const campus = {
        name, description, id
      }
      const updateThunk = updateCampusThunkCreator(campus, ownProps.history)
      dispatch(updateThunk)
    }
  }
}

class EditCampus extends Component {

  constructor() {
    super()
    this.state = {
      campus: {},
      students: []
    }
    this.getCampus = this.getCampus.bind(this)
    this.updateDeletedStudent = this.updateDeletedStudent.bind(this)
    this.updateAddedStudent = this.updateAddedStudent.bind(this)
  }

  updateDeletedStudent (evt) {
    const deleteStudent = { id: evt.target.value, campusId: null }
    this.props.handleDeleteFromCampus(deleteStudent)
      .then(() => {
        const campusId = this.props.match.params.campusId
        this.getCampus(campusId)
      })
      .catch(err => console.error(err))
  }

  updateAddedStudent () {
    const selectedStudent = document.getElementById('newStudent')
    const addStudent = { id: +selectedStudent.value, campus: this.state.campus.name }
    console.log('ADD STUDENT: ', addStudent)
    this.props.addNewStudentToCampus(addStudent)
      .then(() => {
        const campusId = this.props.match.params.campusId
        this.getCampus(campusId)
      })
      .catch(err => console.error(err))
  }

  getCampus(campusId) {
    axios.get(`/api/campuses/${campusId}`)
      .then(res => {
        return res.data})
      .then(campus => {
        this.setState({
          campus: campus[0],
          students: campus[0].students
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    const campusId = this.props.match.params.campusId
    this.getCampus(campusId)
  }

  render() {

    const campus = this.state.campus
    const campusStudents = this.state.students
    const students = this.props.students

    return (
      <form onSubmit={ this.props.handleSubmit } id={ campus.id }>

        <h1> Edit Campus Info </h1>

        <div>
          <label> Campus Name: </label>
          <input
          type="text"
          name="campusName"
          defaultValue={ campus.name }
          placeholder={ campus.name }
          />
        </div>

        <div>
          <label> Description: </label>
          <input
          type="text"
          name="description"
          defaultValue={ campus.description }
          placeholder={ campus.description }
          />
        </div>

        <h3>Students</h3>
        <ul>
          {
            campusStudents ?
              campusStudents.map((student, index) => (
                <div key={ student.id }>
                  <Link to={`/students/${ student.id }`}>
                    <li>{ index + 1 } - { student.firstName } { student.lastName }</li>
                  </Link>
                  <button
                  value={ student.id }
                  onClick={ this.updateDeletedStudent }> X </button>
                </div>
              )) : null
          }
        </ul>

        <h4>Add a student</h4>
        <select name="newStudent" id="newStudent">
          {
            students.map(student =>
              <option value={ student.id } key={ student.id }>{ student.name }</option>
            )
          }
        </select>
        <button onClick={ this.updateAddedStudent }> + </button>

        <div>
          <button type="submit"> Submit </button>
        </div>
      </form>
    )
  }
}

const EditCampusConnect = connect(mapStateToProps, mapDispatchToProps)(EditCampus)

export default EditCampusConnect
