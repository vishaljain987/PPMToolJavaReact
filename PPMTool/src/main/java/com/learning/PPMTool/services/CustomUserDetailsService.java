package com.learning.PPMTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.learning.PPMTool.domain.User;
import com.learning.PPMTool.repositories.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if(user == null){
			throw new UsernameNotFoundException("User not found");
		}
		return user;
	}

	@Transactional
	public User loadUserById(Long Id){
		User user = userRepository.getById(Id);
		if(user == null){
			throw new UsernameNotFoundException("User not found");
		}
		return user;
	}
}
