import axios from "axios";
let $ = require('zepto-browserify').$;
export async function getFilmList(){
    try {
        return  await axios.get('/api/filmlists');
    } catch (error){
        console.log(error)
    }
}

export function validateSignUpForm(){
    let errorMessages = []
    
    let errorDiv = document.getElementById("error-div")
    let email = document.getElementById("Email").value
    let Phone = document.getElementById("Phone").value
    let password = document.getElementById("Password").value
    let confirmPassword = document.getElementById("confirmPassword").value
    
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g
    const phoneRegex = /^(98)\d{8}$/g
    
    if(confirmPassword === password){
        errorMessages.append("Passwords do not match")
    }
    
    if(emailRegex.test(email)){
        errorMessages.append("Email address is not valid")
    }
    
    if(PasswordRegex.test(password)){
        errorMessages.append("Password must have at least one upper case, one lower case and must be eight characters long")
    }
    
    if(phoneRegex.test(Phone)){
        errorMessages.append("Phone number is not valid")
    }
    if (errorMessages.length >0) {
        errorDiv.innerHTML = (errorMessages.map(function (message) {
            return `<li> {message} </li>`
        }).join(''))
        return  false
    } 
    else{
        errorDiv.innerHTML = ''
        return true
    }
    
}



export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
