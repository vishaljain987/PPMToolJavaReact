import React, { Component } from 'react'
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {getProjectTask, updateProjectTask} from "../../../actions/backlogActions";

class UpdateProjectTask extends Component {
    constructor(props){
        super(props);
        this.state={
            id:"",
            projectSequence:"",
            summary: "",
            acceptanceCriteria: '',
            dueDate:"",
            priority:"",
            status:""
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.project_task.id,
            projectSequence: nextProps.project_task.projectSequence,
            summary: nextProps.project_task.summary,
            acceptanceCriteria: nextProps.project_task.acceptanceCriteria,
            dueDate: nextProps.project_task.dueDate,
            priority: nextProps.project_task.priority,
            status: nextProps.project_task.status,
            projectIdentifier: nextProps.project_task.projectIdentifier
        })
    }

    onChangeHandle(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmitHandle(e){
        e.preventDefault();
        const {projectIdentifier, projectSequence} = this.props.match.params;
        const pt = {
            id:this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate
        }
        this.props.updateProjectTask(projectIdentifier, projectSequence, pt, this.props.history);
    }
    render() {
        const {projectIdentifier} = this.props.match.params;
        return (
            <div className="add-PBI">
    <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
                <Link to={`/projectBoard/${projectIdentifier}`} className="btn btn-light">
                    Back to Project Board
                </Link>
                <h4 className="display-4 text-center">Update Project Task</h4>
                <p className="lead text-center">Project Name: {this.state.projectIdentifier} | Project Task Id: {this.state.projectSequence}</p>
                <form onSubmit={(e)=>this.onSubmitHandle(e)}>
                    <div className="form-group">
                        <input type="text" 
                                className={classnames("form-control form-control-lg", {"is-invalid" : this.props.errors.summary})} 
                                name="summary" 
                                value={this.state.summary}
                                onChange={(e)=>this.onChangeHandle(e)}
                                placeholder="Project Task summary" />
                                {this.props.errors.summary && (<div className="invalid-feedback">{this.props.errors.summary}</div>)}
                    </div>
                    <div className="form-group">
                        <textarea className="form-control form-control-lg" 
                                placeholder="Acceptance Criteria" 
                                name="acceptanceCriteria"
                                value={this.state.acceptanceCriteria}
                                onChange={(e)=>this.onChangeHandle(e)}></textarea>
                    </div>
                    <h6>Due Date</h6>
                    <div className="form-group">
                        <input type="date" 
                                className="form-control form-control-lg" 
                                name="dueDate" 
                                value={this.state.dueDate.substring(0,10)}
                                onChange={(e)=>this.onChangeHandle(e)}/>
                    </div>
                    <div className="form-group">
                        <select className="form-control form-control-lg" 
                                name="priority"
                                value={this.state.priority}
                                onChange={(e)=>this.onChangeHandle(e)}>
                            <option value={0}>Select Priority</option>
                            <option value={1}>High</option>
                            <option value={2}>Medium</option>
                            <option value={3}>Low</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select className="form-control form-control-lg" 
                                name="status"
                                value={this.state.status}
                                onChange={(e)=>this.onChangeHandle(e)}>
                            <option value="">Select Status</option>
                            <option value="TO_DO">TO DO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </div>

                    <input type="submit" className="btn btn-primary btn-block mt-4" />
                </form>
            </div>
        </div>
    </div>
</div>
        )
    }

    componentDidMount(){
        const {projectIdentifier, projectSequence} = this.props.match.params;
        this.props.getProjectTask(projectIdentifier, projectSequence, this.props.history);
    }
}

const mapStateToProps = state =>{
    return{
        errors: state.errors,
        project_task: state.backlog.project_task
    }
}
export default connect(mapStateToProps, {getProjectTask, updateProjectTask})(UpdateProjectTask);
