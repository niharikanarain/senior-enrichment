import React from 'react';
import { addCampus } from '../reducers'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (evt) => {
      evt.preventDefault()
      const campus = {
        name: evt.target.name.value,
        imageURL: evt.target.imageURL.value
      }
      const addThunk = addCampus(campus)
      dispatch(addThunk)
    }
  }
}

const NewCampusContainer = connect(null, mapDispatchToProps)(NewCampus)


function NewCampus (props) {
  return (
    <form onSubmit={ props.handleSubmit }>
      <label> Add Campus </label>
      <div>
        <input
        type="text"
        name="name"
        placeholder="Enter campus name"
        />
      </div>
      <div>
        <input
        type="text"
        name="imageURL"
        placeholder="Enter campus image's URL"
        />
      </div>
      <button type="submit">Submit</button>
  </form>
  )
}

export default NewCampusContainer
