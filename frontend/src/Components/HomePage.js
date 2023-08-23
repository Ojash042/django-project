import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import axios from "axios";
import '../App.css'
import {FilmCarousel} from "./FilmCarousel";
import {FilmCards} from "./FilmCards"

export  function HomePage(){
    const [filmList, setFilmList] = React.useState([])
    
    React.useEffect(()=>{
        axios.get('http://localhost:8000/api/filmlists')
            .then((response) =>{
                setFilmList(response.data)
            })
    },[])
    
    const nowShowing = filmList.filter(film=>
    film["film_released_state"] === true
    );
    const toBeReleased = filmList.filter(film=>
    film["film_released_state"] === false) 
    console.log(toBeReleased)
    return (
        <>
            <FilmCarousel filmList={filmList}/>
            <div className="py-3 bg-dark"/>
            <FilmCards filmList={nowShowing} released_state={true}/>
            <div className="py-2 bg-dark"></div>
            <FilmCards filmList={toBeReleased} released_state={false}/>
        </>
    );
}
