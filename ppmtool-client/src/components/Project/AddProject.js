import React, { Component } from 'react';
import {connect} from "react-redux";
import {createProject} from "../../actions/projectActions";
import classnames from "classnames";
import PropTypes from "prop-types";

class AddProject extends Component {

    constructor(){
        super();
        this.state={
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]:e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }
        this.props.createProject(newProject, this.props.history);
    }

    

    render() {
        return (
            <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create Project form</h5>
                        <hr />
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input name="projectName" 
                                    value={this.state.projectName}
                                    type="text" 
                                    className={classnames("form-control form-control-lg", {"is-invalid" : this.props.errors.projectName})} 
                                    placeholder="Project Name" 
                                    onChange = {this.onChange} />
                                    {this.props.errors.projectName && (<div className="invalid-feedback">{this.props.errors.projectName}</div>)}
                            </div>
                            <div className="form-group">
                                <input name="projectIdentifier" 
                                    type="text" 
                                    value={this.state.projectIdentifier}
                                    className={classnames("form-control form-control-lg", {"is-invalid" : this.props.errors.projectIdentifier})} 
                                    placeholder="Unique Project ID" 
                                    onChange = {this.onChange} />
                                    {this.props.errors.projectIdentifier && (<div className="invalid-feedback">{this.props.errors.projectIdentifier}</div>)}
                            </div>
                            <div className="form-group">
                                <textarea name="description" 
                                    value={this.state.description}
                                    className={classnames("form-control form-control-lg", {"is-invalid" : this.props.errors.description})}
                                    onChange = {this.onChange}
                                    placeholder="Project Description"></textarea>
                                    {this.props.errors.description && (<div className="invalid-feedback">{this.props.errors.description}</div>)}
                            </div>
                            <h6>Start Date</h6>
                            <div className="form-group">
                                <input type="date" 
                                    value={this.state.start_date}
                                    className="form-control form-control-lg" 
                                    name="start_date" 
                                    onChange = {this.onChange} />
                            </div>
                            <h6>Estimated End Date</h6>
                            <div className="form-group">
                                <input type="date" 
                                    value={this.state.end_date}
                                    className="form-control form-control-lg" 
                                    name="end_date" 
                                    onChange = {this.onChange} />
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

/*
AddProject.propTypes = {
    createProject : PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
*/

const mapStateToProps = state =>{
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, {createProject})(AddProject);