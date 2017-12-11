import axios from 'axios'

const GET_CAMPUSES = 'GET_CAMPUSES'
const DELETE_CAMPUS = 'DELETE_CAMPUS'
const CREATE_CAMPUS = 'CREATE_CAMPUS'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}
export function deleteCampus (campusId) {
  const action = { type: DELETE_CAMPUS, campusId };
  return action;
}

export function createCampus (campus) {
  const action = { type: CREATE_CAMPUS, campus }
  return action
}

export function updateCampus (campus) {
  const action = { type: UPDATE_CAMPUS, campus }
  return action
}

export default function campuses(state = [], action) {

  let newState = state.slice() // this is for the update case

  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case DELETE_CAMPUS:
      return state.filter(campus => {
        return campus.id !== +action.campusId
      })
    case CREATE_CAMPUS:
      return [...state, action.campus]
    case UPDATE_CAMPUS:
      newState.forEach(campus => {
        if (campus.id === action.campus.id) {
          campus = action.campus
        }
      })
      return newState
    default:
      return state;
  }
}

export function fetchCampuses() {
  return function thunk (dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}

export function deleteCampusThunk (campusId) {
  return function thunk (dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
      .then(() => {
        const action = deleteCampus(campusId)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}

export function addCampus (campus, history) {
  return function thunk (dispatch) {
    return axios.post('/api/campuses', campus)
      .then(campus => campus.data)
      .then(campus => {
        const action = createCampus(campus)
        dispatch(action)
        history.push(`/campuses/${campus.id}`)
      })
      .catch(err => console.error(err))
  }
}

export function updateCampusThunkCreator (campus, history) {
  return function thunk (dispatch) {
    return axios.put(`/api/campuses/${campus.id}`, campus)
      .then(campus => campus.data)
      .then(campus => {
        const action = updateCampus(campus)
        dispatch(action)
        history.push(`/campuses/${campus.id}`)
      })
      .catch(err => console.error(err))
  }
}
