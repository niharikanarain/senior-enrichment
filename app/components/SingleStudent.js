import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SingleStudent extends Component {

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

      return (
        <div>
          <h1> { student.name } </h1>
          <ul>
          {
            student.email ?
              <li>EMAIL: { student.email }</li> : null
          }
          {
            student.campus ?
              <Link to={`/campuses/${ student.campusId }`}>
                <li>CAMPUS: { student.campus.name }</li>
              </Link> : null
          }
          </ul>
          <Link to={`/students/${ student.id }/edit`}>
            <button> Edit Student Info </button>
          </Link>
        </div>
      )
    }
  }
