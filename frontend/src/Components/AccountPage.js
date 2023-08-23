import React, {useState} from "react";
import axios from "axios";
import {getCookie} from "../services";
export function AccountPage(){
    const csrftoken = getCookie("csrftoken")
    const [formData,setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    })
    
    React.useEffect(()=> {
        axios.get('http://localhost:8000/accountInfo/', {
            headers: {
                "X-CSRFToken": csrftoken
            }
        },[])
            .then((response) => {
                setFormData({
                    firstName: response.data["first_name"], 
                    lastName: response.data["last_name"],
                    email: response.data["email"],
                    phone: response.data["contact_info"]
                })
            })
    },[])
    const [errorMessage, setErrorMessage] = useState([])
    const phoneRegex = /^(98)\d{8}$/g
    
    const validateForm = {
        firstName: !!formData && formData.firstName.match(/^ *$/) === null,
        lastName: !!formData.lastName && formData.lastName.match(/^ *$/) === null,
        phone: phoneRegex.test(formData.phone)
    }
    
   function handleChange(event){
        const target = event.currentTarget 
        setFormData({
            ...formData,[target.name]: target.value
        })
        setErrorMessage([])
   } 
    
    
    function handleSubmit(event){
        event.preventDefault()
        
        setErrorMessage([])
        
        if(!validateForm.firstName){
            setErrorMessage((prevError) => [...prevError,"Invalid First Name"])
        }
        if(!validateForm.lastName){
            setErrorMessage((prevError) => [...prevError, "Invalid Last Name"])
        }
        if(!validateForm.phone){
            setErrorMessage((prevError) => [...prevError, "Invalid Phone Number"])
        }
        
        if(Object.values(validateForm).every(key => key)){
            axios.post("http://localhost:8000/accountUpdate/", formData, {
                headers:{
                    "X-CSRFToken":csrftoken
                }
            }).then((response)=>{}).catch((error)=>{})
        }
    }

    return(
        <div className="align-items-center m-auto shadow-4-secondary my-5 p-5 col-xs-12 col-md-8 bg-dark">
            <form onSubmit={handleSubmit}>
                <h2 className="text-white mb-5">Update</h2>
                <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
                <div className="row mb-4 justify-content-sm-between align-items-center">
                    <div className="col justify-content-sm-between my-3 mx-3">
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
                        <input type="text" id="Email" name="email" value={formData.email} onChange={handleChange} disabled
                               className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 text-center"
                        />
                    </div>
                    <div className="col form-outline row my-3 mx-3">
                        <label htmlFor="PhoneNo" className="form-label text-center text-white">Phone</label>
                        <input type="text" id="Phone" name="phone" value={formData.phone} onChange={handleChange} required
                               className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 text-center"
                        />
                    </div>
                </div>
                <div className="row">
                    <input type="submit" value="Submit" className="w-responsive bg-dark p-2 text-white rounded-bottom-pill"/>
                </div>
            </form>
        </div>
    )
}