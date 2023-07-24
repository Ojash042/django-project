import React from "react";

export function FilmCards({filmList,released_state}){
    return(
        <div className="container-fluid w-100 text-white bg-dark row align-items-center justify-content-center">
                <h3>{released_state ? 'Now Showing' : 'Up Coming'}</h3>
                <div className="d-inline-flex">
                    {filmList.map((film,index)=>(
                        <div className="mx-1 my-4 d-flex">
                            <div className = "zoom-image-container">
                                <img 
                                    className="img-fluid" src={film.poster} 
                                    style={{width:"155px",height:"200px"}} 
                                    data-toggle="tooltip" 
                                    title={film.film_name}/>
                            </div>
                        </div>
                    ))} 
            </div>
        </div>
    )
}