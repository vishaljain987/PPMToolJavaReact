import React, { Component } from 'react'
import ProjectItem from './Project/ProjectItem';
import CreateProjectButton from './Project/CreateProjectButton';
import {connect} from "react-redux";
import {getProjects} from "../actions/projectActions";


class Dashboard extends Component {
    render() {
        return (
            <div className="projects">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Projects</h1>
                        <br />
                            <CreateProjectButton />
                        <br />
                        <hr />
                        {this.props.project.projects.map(project=><ProjectItem key={project.id} project={project}/>)}
                        
                    </div>
                </div>
            </div>
        </div>
        )
    }

    componentDidMount(){
        this.props.getProjects();
    }
}

const mapStateToProps = (state) =>{
    return{
        project: state.project
    }
}

export default connect(mapStateToProps, {getProjects})(Dashboard);