import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Backlog from './Backlog';
import {getBacklog} from "../../actions/backlogActions"

class ProjectBoard extends Component {
    //constructor to handle errors
    constructor(props){
        super(props);
        this.state = {
            errors:{}
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    boardAlgorithm(errors, project_tasks){
        if(project_tasks.length < 1){
            if(errors.projectNotFound){
                return (
                    <div className="alert alert-danger text-center" role="alert">
                        {errors.projectNotFound}
                    </div>
                );
            }else{
                return (
                    <div className="alert alert-info text-center" role="alert">
                        No Project Tasks on this board
                    </div>
                );
            }
        }else{
            return (<Backlog project_tasks={project_tasks}/>);
        }
    }
    render() {
        const {projectIdentifier} = this.props.match.params;
        const {project_tasks} = this.props.backlog

        let boardContent = this.boardAlgorithm(this.state.errors, project_tasks);

        return (
            <div className="container">
            <Link to={`/addProjectTask/${projectIdentifier}`} className="btn btn-primary mb-3">
                <i className="fas fa-plus-circle"> Create Project Task</i>
            </Link>
            <br />
            <hr />
            {boardContent}
        </div>
        )
    }

    componentDidMount(){
        const {projectIdentifier} = this.props.match.params;
        this.props.getBacklog(projectIdentifier);
    }
}

const mapStateToProps = state=>{
    return{
        backlog: state.backlog,
        errors: state.errors
    }
}
export default connect(mapStateToProps, {getBacklog})(ProjectBoard);