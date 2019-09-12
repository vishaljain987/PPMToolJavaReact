package com.learning.PPMTool.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.learning.PPMTool.domain.Project;
import com.learning.PPMTool.domain.ProjectTask;
import com.learning.PPMTool.services.MapValidationErrorService;
import com.learning.PPMTool.services.ProjectTaskService;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/{projectIdentifier}")
	public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String projectIdentifier){
		
		if(result.hasErrors()){
			return mapValidationErrorService.mapValidationService(result);
		}
		
		ProjectTask pt = projectTaskService.addProjectTask(projectIdentifier, projectTask);
		return new ResponseEntity<ProjectTask>(pt, HttpStatus.CREATED);
	}
	
	@GetMapping("/{projectIdentifier}")
	public ResponseEntity<List<ProjectTask>> getProjectBacklog(@PathVariable String projectIdentifier){
		return new ResponseEntity<List<ProjectTask>>(projectTaskService.findProjectIdentifier(projectIdentifier), HttpStatus.OK);
	}
	
	@GetMapping("/{backlog_id}/{projectSequence}")
	public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id, @PathVariable String projectSequence){
		ProjectTask pt = projectTaskService.findProjectSequence(backlog_id, projectSequence);
		return new ResponseEntity<ProjectTask>(pt, HttpStatus.OK);
	}
	
	@PatchMapping("/{backlog_id}/{projectSequence}")
	public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlog_id, @PathVariable String projectSequence){
		if(result.hasErrors()){
			return mapValidationErrorService.mapValidationService(result);
		}
		ProjectTask pt = projectTaskService.updateByProjectSequence(projectTask, backlog_id, projectSequence);
		return new ResponseEntity<ProjectTask>(pt, HttpStatus.OK);
	}
	
	@DeleteMapping("/{backlog_id}/{projectSequence}")
	public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String projectSequence){
		projectTaskService.deleteByProjectSequence(backlog_id, projectSequence);
		return new ResponseEntity<String>("Project Task "+projectSequence+" was successfully deleted", HttpStatus.OK);
	}
}
