package com.learning.PPMTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning.PPMTool.domain.Project;
import com.learning.PPMTool.exceptions.ProjectIdException;
import com.learning.PPMTool.repositories.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	public Project saveOrUpdateProject(Project project){
		try{
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
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
