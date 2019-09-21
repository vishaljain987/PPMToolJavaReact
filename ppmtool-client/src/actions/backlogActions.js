import axios from 'axios';
import {GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK} from "../actions/types";
import { async } from 'q';


export const addProjectTask = (projectIdentifier, projectTask, history)=>{
    return async (dispatch, getState)=>{
        try{
            await axios.post(`/api/backlog/${projectIdentifier}`, projectTask);
            history.push(`/projectBoard/${projectIdentifier}`);
            dispatch({
                type:GET_ERRORS,
                payload:{}
            })
        }
        catch(err){
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        }
    }
}

export const getBacklog = (projectIdentifier) =>{
    return async (dispatch, getState)=>{
        try{
            const res = await axios.get(`/api/backlog/${projectIdentifier}`);
            dispatch({
                type: GET_BACKLOG,
                payload: res.data
            })
        }catch(err){
           
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        }
       
    }
}

export const getProjectTask = (projectIdentifier, projectSequence, history)=>{
    return async (dispatch, getState)=>{
        try{
            const res = await axios.get(`/api/backlog/${projectIdentifier}/${projectSequence}`);
            dispatch({
                type: GET_PROJECT_TASK,
                payload: res.data
            })
        }catch(err){
            history.push('/dashboard');
        }
        
    }
}

export const updateProjectTask = (projectIdentifier, projectSequence, projectTask, history) =>{
    return async (dispatch, getState)=>{
        try{
            await axios.patch(`/api/backlog/${projectIdentifier}/${projectSequence}`, projectTask);
            history.push(`/projectBoard/${projectIdentifier}`);
            dispatch({
                type:GET_ERRORS,
                payload:{}
            })
        }catch(err){
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        }
        
    }
}

export const deleteProjectTask = (projectIdentifier, projectSequence)=>{
    return async (dispatch, getState) =>{
        if(window.confirm(`You are deleting project task ${projectSequence}, this action cannot be undone`)){
            await axios.delete(`/api/backlog/${projectIdentifier}/${projectSequence}`);
            dispatch({
                type: DELETE_PROJECT_TASK,
                payload: projectSequence
            })
        }
    }
   
}