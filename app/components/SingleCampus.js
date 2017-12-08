import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

// could use a connected component with ownProps

export default class SingleCampus extends Component {

  constructor() {
    super()
    this.state = {
      campus: {}
    }
    this.getCampus = this.getCampus.bind(this)
  }

  getCampus(campusId) {
    axios.get(`/api/campuses/${campusId}`)
      .then(res => {
        return res.data})
      .then(campus => {
        this.setState({
          campus: campus[0]
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

    return (
      <div>
        <h1>{ campus.name }</h1>
        {
          campus.description ? <h2>Description - { campus.description }</h2> : null
        }
        <h3>Students</h3>
        <ul>
        {
          campus.students ?
            campus.students.map((student, index) => (
              <Link to={`/students/${ student.id }`} key={ student.id }>
                <li>{ index } - { student.firstName } { student.lastName }</li>
              </Link>
            )) : <h4>No students on this campus</h4>
        }
        </ul>
        <Link to={`/campuses/${ campus.id }/edit`}>
          <button> Edit Campus Info </button>
        </Link>
      </div>
    )
  }
}

