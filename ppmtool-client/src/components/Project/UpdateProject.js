import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProject, createProject} from "../../actions/projectActions"
import classnames from 'classnames';
import { stat } from 'fs';

class UpdateProject extends Component {

    constructor(){
        super();
        this.state={
            id:"",
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: ""
        }
    }

    onChangeHandle(e){
        this.setState({ [e.target.name]:e.target.value });
    }

    onSubmitHandle(e){
        e.preventDefault();
        const newProject = {
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }
        this.props.createProject(newProject, this.props.history);
    }

    componentWillReceiveProps(nextProps){
        const {id, projectName, projectIdentifier, description, start_date, end_date} = nextProps.project;
        this.setState({id, projectName, projectIdentifier, description, start_date, end_date});
    }
    render() {

        return (
            <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create / Edit Project form</h5>
                        <hr />
                        <form onSubmit={(e)=>this.onSubmitHandle(e)}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className={classnames("form-control form-control-lg", {"is-invalid" : this.props.errors.projectName})} 
                                    placeholder="Project Name" 
                                    name="projectName"
                                    onChange={(e)=>{this.onChangeHandle(e)}}
                                    value={this.state.projectName} />
                                    {this.props.errors.projectName && (<div className="invalid-feedback">{this.props.errors.projectName}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Unique Project ID"
                                        value={this.state.projectIdentifier}
                                    disabled />
                            </div>
                           
                            <div className="form-group">
                                <textarea className={classnames("form-control form-control-lg", {"is-invalid" : this.props.errors.description})} 
                                          placeholder="Project Description" 
                                          name="description"
                                          onChange={(e)=>{this.onChangeHandle(e)}}
                                          value={this.state.description} ></textarea>
                                           {this.props.errors.description && (<div className="invalid-feedback">{this.props.errors.description}</div>)}
                            </div>
                            <h6>Start Date</h6>
                            <div className="form-group">
                                <input type="date" 
                                        className="form-control form-control-lg" 
                                        name="start_date"
                                        onChange={(e)=>{this.onChangeHandle(e)}}
                                        value={this.state.start_date} 
                                         />
                            </div>
                            <h6>Estimated End Date</h6>
                            <div className="form-group">
                                <input type="date" 
                                        className="form-control form-control-lg" 
                                        name="end_date"
                                        onChange={(e)=>{this.onChangeHandle(e)}}
                                        value={this.state.end_date} />
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
        this.props.getProject(this.props.match.params.projectIdentifier, this.props.history);
    }
}

const mapStateToProps = state =>{
    return{
        project: state.project.project,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {getProject, createProject})(UpdateProject);