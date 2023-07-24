import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../services";

export function LoginPage(){
    const csrftoken = getCookie('csrftoken')
    const [errorMessages, setErrorMessages] = useState([])
    const navigate = useNavigate()
    function handleSubmit(event){
        event.preventDefault();
        setErrorMessages([])
        const formData = new FormData(event.target)
        
        axios.post('/LoginPost/',formData,{
            headers:{
                "X-CSRFToken": csrftoken
            }
        }).then(response=> {
            window.location.href = '/'
        }
        ).catch((error)=>{
            if(error.response && error.response.data && error.response.data.error){
                setErrorMessages((prevErrors)=>[...prevErrors, error.response.data.error])
            }
        })
    }
    return(
        <div className="container my-3 align-items-center m-auto my-3 p-5 col-xs-12 col-md-8 bg-dark">
           <form onSubmit={handleSubmit}>
               <h2 className="text-white m-3 py-3 mb-5">Login</h2>
              <div id="error-div" className="text-warning">
                  {errorMessages.map((message)=>(
                      <li>{message}</li>
                  ))}
                </div> 
               <input type="hidden" name="csrfmidddlewaretoken" value={csrftoken}/>
                   <div className="row justify-content-sm-between align-items-center my-4">
                      <div className="form-outline row">
                          <label htmlFor="Email" className="form-label text-center text-white">E-mail</label>
                          <input type="text" id="Email" name="email" 
                                 className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 border-white text-center" required
                                 />
                      </div> 
                       <div className="row mb-4 justify-content-sm-between align-items-center my-3">
                           <div className="form-outline row mx-3 my-3">
                               <label htmlFor="Password" className="form-label  text-white text-center">Password</label>
                               <input type="password" id="Password" name="password"
                                      className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 text-center"
                               />
                           </div>
                       </div>
                   </div>
               <div className="row">
                    <input className="w-responsive bg-dark p-2 text-white rounded-bottom-pill" type="submit" value="Submit"/>
               </div>
           </form> 
        </div>
    )
}