package com.learning.PPMTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning.PPMTool.domain.Backlog;
import com.learning.PPMTool.domain.Project;
import com.learning.PPMTool.exceptions.ProjectIdException;
import com.learning.PPMTool.repositories.BacklogRepository;
import com.learning.PPMTool.repositories.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	public Project saveOrUpdateProject(Project project){
		try{
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			if(project.getId() == null){
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			}
			
			if(project.getId() != null){
				project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
			}
			return projectRepository.save(project);
		}
		catch(Exception e){
			throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' already exists");
		}
	}
	
	public Project findProjectByIdentifier(String projectIdentifier){
		Project project =  projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if(project == null){
			throw new ProjectIdException("Project "+projectIdentifier+" does not exists");
		}
		return project;
	}
	
	public Iterable<Project> findAllProjects(){
		return projectRepository.findAll();
	}
	
	public void deleteProjectByIdentifier(String projectIdentifier){
		Project project =  projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if(project == null){
			throw new ProjectIdException("Project "+projectIdentifier+" does not exists for delete");
		}
		projectRepository.delete(project);
	}

}
