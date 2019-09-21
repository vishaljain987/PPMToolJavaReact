package com.learning.PPMTool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.learning.PPMTool.domain.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long>{

	Project findByProjectIdentifier(String projectIdentifier);
	
	@Override
	Iterable<Project> findAll();

	Iterable<Project> findAllByProjectLeader(String username);
	
	void deleteByProjectIdentifier(String projectIdentifier);
	
}
