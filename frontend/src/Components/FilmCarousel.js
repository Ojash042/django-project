import React from "react";
import {Carousel} from "react-bootstrap";


export function FilmCarousel({filmList}){
    return(
        <Carousel>
            {filmList.map((film)=>(
                <Carousel.Item>
                    <img className="w-100 img-responsive " src={film.backdrop} style={{zIndex:0}} alt={film["film_name"]}/>    
                    <Carousel.Caption>
                        <h3>{film["film_name"]}</h3>
                        <p>{film["overview"]}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                    ))}
        </Carousel>
    );
}