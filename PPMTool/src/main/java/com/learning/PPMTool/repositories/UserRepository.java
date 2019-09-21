package com.learning.PPMTool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.learning.PPMTool.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{
	public User findByUsername(String username);
	public User getById(Long Id);
}
