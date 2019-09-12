package com.learning.PPMTool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.learning.PPMTool.domain.Backlog;


@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long>{
	Backlog findByProjectIdentifier(String identifier);
}
