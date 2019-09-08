import axios from "axios";
import {GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT} from "./types";


export const createProject = (project, history) =>{
    return async (dispatch, getState)=>{
        try{
            await axios.post("/api/project", project);
            history.push("/dashboard");
            dispatch({
                type:GET_ERRORS,
                payload: {}
            })
        }catch(err){
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        }
    }   
}

export const getProjects = () =>{
    return async (dispatch, getState)=>{
            const res = await axios.get("/api/project/all");
            dispatch({
                type: GET_PROJECTS,
                payload: res.data
            })
        }
}

export const getProject = (projectIdentifier, history) =>{
    return async(dispatch, getState) =>{
        try{
            const res = await axios.get("/api/project/"+projectIdentifier);
            dispatch({
                type: GET_PROJECT,
                payload: res.data
            })
        }catch(err){
            history.push("/dashboard");
        }
        
    }
}

export const deleteProject = (projectIdentifier) =>{
    return async(dispatch, getState) =>{
        
            await axios.delete("/api/project/"+projectIdentifier);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectIdentifier
            })
       
        
    }
}

