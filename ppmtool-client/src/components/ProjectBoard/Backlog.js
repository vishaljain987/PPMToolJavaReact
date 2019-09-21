import React, { Component } from 'react'
import ProjectTask from './ProjectTask/ProjectTask';

class Backlog extends Component {
    render() {
        const {project_tasks} = this.props;
        const tasks_todo = project_tasks.filter(task=>task.status === "TO_DO").map(task=><ProjectTask key={task.id} task={task}/>);
        const tasks_inprogress =  project_tasks.filter(task=>task.status === "IN_PROGRESS").map(task=><ProjectTask key={task.id} task={task}/>);
        const tasks_done = project_tasks.filter(task=>task.status === "DONE").map(task=><ProjectTask key={task.id} task={task}/>);
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>
                    {tasks_todo}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {tasks_inprogress}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {tasks_done}
                </div>
            </div>
        </div>
        )
    }
}


export default Backlog;