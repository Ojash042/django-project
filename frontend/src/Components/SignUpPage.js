import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../services";

export function SignUpPage(){
    const csrftoken = getCookie('csrftoken')
    const navigate= useNavigate()
    const[formData,setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone:'',
        password: '',
        confirmPassword: '',
    })
    
    const [errorMessages, setErrorMessages] = useState([])
    function handleChange(event){
        const target = event.currentTarget 
        setFormData({
            ...formData,[target.name]: target.value
        })
        setErrorMessages([])
   }
    
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g
    const phoneRegex = /^(98)\d{8}$/g
    
    const validateForm ={
        firstName: !!formData.firstName && formData.firstName.match(/^ *$/) === null,
        lastName: !!formData.lastName && formData.lastName.match(/^ *$/) === null,
        email: emailRegex.test(formData.email),
        phone: phoneRegex.test(formData.phone),
        password: PasswordRegex.test(formData.password),
        confirmPassword:formData.confirmPassword === formData.password
    }

    function handleSubmit(event){
        event.preventDefault();
        
        setErrorMessages([])
        if(!validateForm.firstName){
            setErrorMessages((prevErrors)=>[...prevErrors,"Invalid First Name"])
        }
        if(!validateForm.lastName){
            setErrorMessages((prevErrors)=>[...prevErrors,"Invalid Last Name"])
        }
        if(!validateForm.email){
            setErrorMessages((prevErrors)=>[...prevErrors,"Invalid E-Mail"])
        }
       
        if(!validateForm.phone){
            setErrorMessages((prevErrors)=>[...prevErrors,"Invalid Phone No"])
        }
        if (!validateForm.password){
            setErrorMessages((prevErrors)=>[...errorMessages,"Password must be 8 character long and must consist of at least 1 Upper Case and 1 Lower Case"])
        }
        if(!validateForm.confirmPassword){
            setErrorMessages((prevErrors)=>[...prevErrors,"Passwords Do Not Match"])
        }
        if (Object.values(validateForm).every(key => key)){
            axios.post('http://localhost:8000/register/',formData,{
                headers:{
                    'X-CSRFToken': csrftoken
                }
            }).then(response => {
                window.location.href = "/";
            }).catch(error =>{
                if(error.response && error.response.data && error.response.data.error){
                    setErrorMessages((prevErrors) => [...prevErrors,error.response.data.error])
                }
            })
        }
    } 
    
    return(
        <div className="align-items-center m-auto shadow-4-secondary my-3 p-5 col-xs-12 col-md-8 bg-dark">
            <form onSubmit= {handleSubmit}>
                <h2 className="text-white mb-5">Sign Up</h2>
                <div id="error-div" className="text-warning">
                    {errorMessages.map((message)=>(
                        <li>{message}</li>
                    ))}
                </div>
                <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
                <div className="row mb-4 justify-content-sm-between align-items-center">
                    <div className="col justify-content-sm-around my-3 mx-3">
                        <div className="form-outline row">
                            <label htmlFor="FirstName" className="form-label text-center text-white" >First Name</label>
                            <input type="text" id="FirstName" name="firstName" value={formData.firstName} onChange={handleChange}
                                   className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 border-white text-center" required 
                            />
                        </div>
                    </div>
                    
                    <div className="col">
                        <div className="form-outline row my-3 mx-3">
                            <label htmlFor="LastName" className="form-label text-center text-white">Last Name</label> 
                            <input type="text" id="LastName" name="lastName" value={formData.lastName} onChange={handleChange} required
                                   className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 text-center" 
                            /> 
                        </div>
                    </div>
                </div>
                    <div className="row mb-4 align-items-center my-3">
                        <div className="col form-outline row my-3 mx-3">
                            <label htmlFor="Email" className="form-label text-center text-white">E-Mail</label>
                            <input type="text" id="Email" name="email" value={formData.email} onChange={handleChange} required
                                   className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 text-center"/>
                        </div>
                        <div className="col form-outline row my-3 mx-3">
                            <label htmlFor="PhoneNo" className="form-label text-center text-white">Phone</label>
                            <input type="text" id="Phone" name="phone" value={formData.phone} onChange={handleChange} required
                                   className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 text-center"/>
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center my-3">
                        <div className="col form-outline row my-3 mx-3">
                            <label htmlFor="Password" className="form-label text-center text-white">Password</label>
                            <input type="password" id="Password" name="password" value={formData.password} onChange={handleChange} required
                                   className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 text-center"
                                    
                            />
                        </div>
                        <div className="col form-outline row my-3 mx-3">
                            <label htmlFor="ConfirmPassword" className="form-label text-center text-white">Confirm Password</label>
                            <input type="password" id="ConfirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
                                   className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 text-center"/>
                        </div>
                    </div> 
                <div className="row">
                    <input type="submit" value="Submit" className="w-responsive bg-dark p-2 text-white rounded-bottom-pill" /> 
                </div>
                    </form>
                </div>
    )
}