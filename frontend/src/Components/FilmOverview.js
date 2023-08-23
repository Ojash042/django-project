import React from 'react'

export function FilmOverview(filmDetails){
    filmDetails = filmDetails["filmDetails"]
   return(
       <>
       <figure className="px-3 align-items-center">
           <img  className="img-fluid" src={filmDetails["poster"]} alt={filmDetails["film_name"]}/>    
       </figure>
           <div className="text-white flex-row">
               <p className="px-3 text-center">{filmDetails["film_released_state"]? "Now Showing" : "Up Coming"}</p>
               <h2 className="px-3 text-center">{filmDetails["film_name"]}</h2>
           </div>
           <div className="d-flex">
               <label className="px-2">{(filmDetails["overview"])}</label>
           </div>
           <div className="d-flex text-white py-2 px-2 row">
               <div className="d-flex text-body text col py-1">
                   <label className="text-white" style={{fontWeight: 'bold'}}>Cast:&nbsp;</label>
                   <label className="text-white">{filmDetails["film_cast"]}</label>
               </div>
               <div className="d-flex text-body text col py-1">
                   <label className="text-white" style={{fontWeight: 'bold'}}>Director:&nbsp;</label>
                   <label className="text-white">{filmDetails["film_director"]}</label>
               </div>
           </div> 
       </>
)}