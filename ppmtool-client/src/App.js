import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import {BrowserRouter, Route} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import {Provider} from "react-redux";
import store from "./store";
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTask/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTask/UpdateProjectTask';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/updateProject/:projectIdentifier" component={UpdateProject} />
          <Route exact path="/projectBoard/:projectIdentifier" component={ProjectBoard} />
          <Route exact path="/addProjectTask/:projectIdentifier" component={AddProjectTask} />
          <Route exact path="/updateProjectTask/:projectIdentifier/:projectSequence" component={UpdateProjectTask} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
