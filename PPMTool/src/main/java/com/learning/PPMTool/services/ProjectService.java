package com.learning.PPMTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning.PPMTool.domain.Backlog;
import com.learning.PPMTool.domain.Project;
import com.learning.PPMTool.domain.User;
import com.learning.PPMTool.exceptions.ProjectIdException;
import com.learning.PPMTool.exceptions.ProjectNotFoundException;
import com.learning.PPMTool.repositories.BacklogRepository;
import com.learning.PPMTool.repositories.ProjectRepository;
import com.learning.PPMTool.repositories.UserRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Project saveOrUpdateProject(Project project, String username){
		
		
		try{
			User user = userRepository.findByUsername(username);
			project.setUser(user);
			project.setProjectLeader(user.getUsername());
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			if(project.getId() == null){
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			}
			
			if(project.getId() != null){
				//project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
				Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase());
				if(existingProject != null && !existingProject.getProjectIdentifier().equals(username)){
					throw new ProjectNotFoundException("Project not found in your account");
				}else if(existingProject == null){
					throw new ProjectNotFoundException("Project with identifier"+project.getProjectIdentifier()+" cannot be updated because it does not exist");
				}
			}
			return projectRepository.save(project);
		}
		catch(Exception e){
			throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' already exists");
		}
	}
	
	public Project findProjectByIdentifier(String projectIdentifier, String username){
		Project project =  projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if(project == null){
			throw new ProjectIdException("Project "+projectIdentifier+" does not exists");
		}
		
		if(!project.getProjectLeader().equals(username)){
			throw new ProjectIdException("Project not found in your account");
		}
		return project;
	}
	
	public Iterable<Project> findAllProjects(String username){
		return projectRepository.findAllByProjectLeader(username);
	}
	
	public void deleteProjectByIdentifier(String projectIdentifier, String username){
		Project project =  findProjectByIdentifier(projectIdentifier.toUpperCase(), username);
		if(project == null){
			throw new ProjectIdException("Project "+projectIdentifier+" does not exists for delete");
		}
		projectRepository.delete(project);
	}

}
