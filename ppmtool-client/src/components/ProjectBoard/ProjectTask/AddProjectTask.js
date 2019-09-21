import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {addProjectTask} from "../../../actions/backlogActions";

class AddProjectTask extends Component {

    constructor(props){
        super(props);
        const {projectIdentifier} = this.props.match.params;
        this.state={
            summary: "",
            acceptanceCriteria:"",
            dueDate:"",
            priority:0,
            status:"",
            projectIdentifier: projectIdentifier,
            errors:{}
        }
    }

    onChangeHandle(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmitHandle(e){
        e.preventDefault();
        const newPT = {
            summary:this.state.summary,
            acceptanceCriteria:this.state.acceptanceCriteria,
            dueDate:this.state.dueDate,
            priority:this.state.priority,
            status: this.state.status
        }
        const {projectIdentifier} = this.props.match.params;
        this.props.addProjectTask(projectIdentifier,newPT,this.props.history);
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
                <h4 className="display-4 text-center">Add Project Task</h4>
                <p className="lead text-center">Project Name + Project Code</p>
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
                                value={this.state.dueDate}
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
}

const mapStateToProps = state =>{
    return{
        errors:state.errors
    }
}

export default connect(mapStateToProps, {addProjectTask})(AddProjectTask);
