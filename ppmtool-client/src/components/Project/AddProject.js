import React, { Component } from 'react';
import {connect} from "react-redux";
import {createProject} from "../../actions/projectActions";

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
        console.log(newProject);
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
                                    className="form-control form-control-lg " 
                                    placeholder="Project Name" 
                                    onChange = {this.onChange} />
                                    
                            </div>
                            <div className="form-group">
                                <input name="projectIdentifier" 
                                    type="text" 
                                    value={this.state.projectIdentifier}
                                    className="form-control form-control-lg" 
                                    placeholder="Unique Project ID" 
                                    onChange = {this.onChange} />
                            </div>
                            <div className="form-group">
                                <textarea name="description" 
                                    value={this.state.description}
                                    className="form-control form-control-lg" 
                                    onChange = {this.onChange}
                                    placeholder="Project Description"></textarea>
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



export default connect(null, {createProject})(AddProject);