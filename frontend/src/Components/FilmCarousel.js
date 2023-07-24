import React from "react";
import axios from "axios";
import {Carousel} from "react-bootstrap";

export function FilmCarousel(){
    const [filmList, setFilmList] = React.useState([])
    React.useEffect(()=> {
        axios.get('http://localhost:8000/api/filmlists')
            .then((response) => {
            setFilmList(response.data);
            }) 
    },[])
  
    return(
        <Carousel>
            {filmList.map((film, index)=>(
                <Carousel.Item>
                    <img className="w-100 img-responsive " src={film.backdrop} style={{zIndex:0}}/>    
                    <Carousel.Caption>
                        <h3>{film.film_name}</h3>
                        <p>{film.overview}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                    ))}
        </Carousel>
    );
}