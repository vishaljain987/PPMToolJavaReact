package com.learning.PPMTool.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning.PPMTool.domain.Backlog;
import com.learning.PPMTool.domain.Project;
import com.learning.PPMTool.domain.ProjectTask;
import com.learning.PPMTool.exceptions.ProjectNotFoundException;
import com.learning.PPMTool.repositories.BacklogRepository;
import com.learning.PPMTool.repositories.ProjectRepository;
import com.learning.PPMTool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask pt){
		try{
			//PTs to be added to specific project, project != null
			Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			
			//set the backlog to the PT
			pt.setBacklog(backlog);
			
			//projectSequence IDPRO-1, IDPRO-2
			Integer backlogSequence = backlog.getPTSequence();
			
			//update backlog sequence
			backlogSequence++;
			backlog.setPTSequence(backlogSequence);
			
			//add sequence to PT
			pt.setProjectSequence(projectIdentifier+"-"+backlogSequence);
			pt.setProjectIdentifier(projectIdentifier);
			
			//initial priority when priority null
			if(pt.getPriority()==null){
				pt.setPriority(3);
			}
			
			//initial status when status null
			if(pt.getStatus() == null || pt.getStatus()==""){
				pt.setStatus("TO_DO");
			}
			return projectTaskRepository.save(pt);
		}
		catch(Exception e){
			throw new ProjectNotFoundException("Project not found");
		}
		
	}

	public List<ProjectTask> findProjectIdentifier(String projectIdentifier) {
			
		Project project = projectRepository.findByProjectIdentifier(projectIdentifier);
		if(project==null){
			throw new ProjectNotFoundException("Project "+projectIdentifier+" not found");
		}
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
	}
	
	public ProjectTask findProjectSequence(String backlog_id, String projectSequence){
		//make sure we are searching on the right backlog
		Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
		if(backlog == null){
			throw new ProjectNotFoundException("Project with Id: "+backlog_id+" not found");
		}
		
		//make sure that our task exists
		ProjectTask pt = projectTaskRepository.findByProjectSequence(projectSequence);
		if(pt==null){
			throw new ProjectNotFoundException("Project Task with Id: "+projectSequence+" not found");
		}
		
		//make sure that the backlog/project id in the path corresponds to the right project
		if(!pt.getProjectIdentifier().equals(backlog_id)){
			throw new ProjectNotFoundException("Project Task "+projectSequence+" does not exist in Project"+backlog_id);
		}
		return pt;
	}
	
	public ProjectTask updateByProjectSequence(ProjectTask updated_pt, String backlog_id, String projectSequence){
		ProjectTask pt = this.findProjectSequence(backlog_id, projectSequence);
		pt=updated_pt;
		return projectTaskRepository.save(pt);
	}
	
	public void deleteByProjectSequence(String backlog_id, String projectSequence){
		ProjectTask pt = this.findProjectSequence(backlog_id, projectSequence);
		projectTaskRepository.delete(pt);
	}
}
