import React from 'react'
import { connect } from 'react-redux'
import { deleteCampusThunk } from '../reducers/index';
import { Link } from 'react-router-dom'


const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteClick: (evt) => {
      const id = evt.target.value
      const deleteThunk = deleteCampusThunk(id)
      dispatch(deleteThunk)
    }
  }
}

const CampusesContainer = connect(mapStateToProps, mapDispatchToProps)(Campuses)

function Campuses(props) {
  return (
    <div>
      <div>
        <Link to="/new-campus">
          <button> Add campus </button>
        </Link>
      </div>
      <div id="campus-container">
        {
          props.campuses.map(campus => (
              <div className="campus" key={ campus.id }>

                <img src={ campus.imageURL } />

                <Link to={`/campuses/${ campus.id }`} key={ campus.id }>
                  <h3>{ campus.name }</h3>
                </Link>

                <button value={ campus.id } onClick={ props.handleDeleteClick }> Delete </button>

              </div>
          ))
        }
      </div>
    </div>
  )
}

export default CampusesContainer
