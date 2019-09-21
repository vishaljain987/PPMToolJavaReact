package com.learning.PPMTool.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.PPMTool.domain.User;
import com.learning.PPMTool.payload.JWTLoginSuccessResponse;
import com.learning.PPMTool.payload.LoginRequest;
import com.learning.PPMTool.security.JwtTokenProvider;
import com.learning.PPMTool.services.MapValidationErrorService;
import com.learning.PPMTool.services.UserService;
import com.learning.PPMTool.validator.UserValidator;
import static com.learning.PPMTool.security.SecurityConstants.TOKEN_PREFIX; 

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserValidator userValidator;
	
	@Autowired 
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManger;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
		
		if(result.hasErrors()){
			return mapValidationErrorService.mapValidationService(result);
		}
		
		Authentication authentication = authenticationManger.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequest.getUsername(),
						loginRequest.getPassword()
				)
		);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);
		return new ResponseEntity<JWTLoginSuccessResponse>(new JWTLoginSuccessResponse(true, jwt), HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User newUser, BindingResult result){
		//validate passwords match
		userValidator.validate(newUser, result);
		
		if(result.hasErrors()){
			return mapValidationErrorService.mapValidationService(result);
		}
		
		User user = userService.saveUser(newUser);
		user.setConfirmPassword("");
		return new ResponseEntity<User>(user, HttpStatus.CREATED);
		//
	}
}
