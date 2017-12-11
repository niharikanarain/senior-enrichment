import React from 'react';
import { connect } from 'react-redux'
import { deleteStudentThunk } from '../reducers/index';
import { Link } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    students: state.students,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteClick: (evt) => {
      const id = evt.target.value
      const deleteThunk = deleteStudentThunk(id)
      dispatch(deleteThunk)
    }
  }
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students)

function Students (props) {
  return (
    <div>
      <Link to="/new-student">
        <button> Add student </button>
      </Link>
      <ul>
        {
          props.students.map(student => (
            <li key={ student.id }>
              <Link to={`/students/${student.id}`}>
                <span>{ student.id } - { student.firstName } - </span>
              </Link>
              <Link to={`/campuses/${student.campusId}`}>
                { student.campus ?
                <span>{ student.campus.name }</span> : 'NO CAMPUS' }
              </Link>
              <button value={ student.id } onClick={ props.handleDeleteClick }> X </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default StudentsContainer
