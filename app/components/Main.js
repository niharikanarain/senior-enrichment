import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import Campuses from './Campuses'
import store from '../store'
import { fetchStudents, fetchCampuses } from '../reducers'
import Students from './Students'
import NewStudent from './NewStudent'
import NewCampus from './NewCampus'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'
import EditStudent from './EditStudent'
import EditCampus from './EditCampus'

export default class Main extends Component {

  componentDidMount () {
    const studentsThunk = fetchStudents()
    const campusesThunk = fetchCampuses()
    store.dispatch(campusesThunk)
    store.dispatch(studentsThunk)
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
            <Switch>
              <Route exact path="/" component={Campuses} />
              <Route exact path="/campuses" component={Campuses} />
              <Route exact path="/campuses/:campusId" component={SingleCampus} />
              <Route exact path="/campuses/:campusId/edit" component={EditCampus} />
              <Route exact path="/students" component={Students} />
              <Route exact path="/students/:studentId" component={SingleStudent} />
              <Route exact path="/students/:studentId/edit" component={EditStudent} />
              <Route exact path="/new-student" component={NewStudent} />
              <Route exact path="/new-campus" component={NewCampus} />
            </Switch>
        </div>
      </Router>
    )
  }

}

// <Navbar />
// <Router>
// <div id="main">
//   <Navbar />
//   <Switch>
//     <Route exact path="/students" component={Students} />
//     <Route path="/campus/:campusId" component={SingleCampus} />
//     <Route path="/students/new-student" component={NewStudent} />
//   </Switch>
// </div>
// </Router>
