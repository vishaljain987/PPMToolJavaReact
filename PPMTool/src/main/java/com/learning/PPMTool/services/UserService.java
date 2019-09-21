package com.learning.PPMTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.learning.PPMTool.domain.User;
import com.learning.PPMTool.exceptions.UsernameAlreadyExistException;
import com.learning.PPMTool.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveUser(User newUser){
		
		try{
			
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			
			//username has to be unique
			newUser.setUsername(newUser.getUsername());
			
			//make sure that password and confirm password match
			
			//we don't persist or show confirm password
			return userRepository.save(newUser);
			
		}catch(Exception e){
			throw new UsernameAlreadyExistException("Username '"+newUser.getUsername()+"' already exists");
		}
		
	}
}
