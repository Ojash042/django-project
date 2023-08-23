import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Seating} from "./Seating.js";
import {FilmOverview} from "./FilmOverview";

export function FilmDetails() {
    const {imdb_id} = useParams()
    const [filmDetails, setFilmDetails] = useState({})
    const [filmScreeningsByDate, setFilmScreeningsByDate] = useState({})
    const [theatreSelected, setTheatreSelected] = useState(0);
    const [seatDetails, setSeatDetails] = useState([])
    const [screeningId, setScreeningId] = useState(-1)
    
    function compareByScreeningStartTime(a,b){
        let dateA = new Date();
        let dateB = new Date();
        let arrayOfDateA = a["screening_start_time"].split(":"); 
        let arrayOfDateB = b["screening_start_time"].split(":");
        dateA.setHours(Number(arrayOfDateA[0]),Number(arrayOfDateA[1]), Number(arrayOfDateA[2]));
        dateB.setHours(Number(arrayOfDateB[0]),Number(arrayOfDateB[1]), Number(arrayOfDateB[2]));
        if(dateA>dateB){
            return 1;
        }
        else if (dateB<dateA){
            return -1;
        }
        else {
            return 0
        }
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/film/${imdb_id}`)
             .then((response)=>{
                setFilmDetails(response.data)
                let responseDataScreenings = response.data["screening"];
                let filmScreenings = {}
                responseDataScreenings.forEach(screening => {
                    let screeningStartDate = screening["screening_start_date"];
                    if(!filmScreenings[screeningStartDate]){
                        filmScreenings[screeningStartDate] = [];
                    }
                    delete screening["screening_start_date"]
                    filmScreenings[screeningStartDate].push(screening)
                    filmScreenings[screeningStartDate].sort(compareByScreeningStartTime);
                })
                    //console.log(JSON.stringify(filmScreeningsByDate))
                setFilmScreeningsByDate(JSON.parse(JSON.stringify(filmScreenings)))
            })
            .catch((error)=>{
                console.log(error)})
        },[])

    useEffect(() => {
        if (screeningId !== -1) {
            axios.get(`http://localhost:8000/api/screening/${screeningId}`)
                .then((response)=>{
                    const ungroupedSeats = response.data;
                    let groupedSeats = []
                    ungroupedSeats.forEach(seats => {
                        const seatRow = seats["seat_row"]
                        if (!groupedSeats[seatRow]){
                            groupedSeats[seatRow] = []
                        }
                        delete seats["seat_row"]
                        groupedSeats[seatRow].push(seats)
                    })
                    setSeatDetails(groupedSeats)
                    setTheatreSelected(theatreSelected+1)
                })
                .catch(error =>{
                    console.log(error)
                })
        }}, [screeningId]);
    
    return(
        <div className="container row min-vh-100 text-white min-vw-100 m-2 p-2" style={{backgroundColor: 'rgb(33,37,41)'}}>
            <section className="bg-dark  col-md-3 h-100 my-auto flex-container align-items-center justify-content-center">
                {JSON.stringify(filmDetails) !== '{}' && <FilmOverview filmDetails={filmDetails}/>}
            </section>
            <div className="col-md-9">
                <section className="bg-dark row">
                    <div className="card bg-dark">
                        <div className="card-header bg-dark d-flex">
                            <h5 className="text-white col">Select Screening for {filmDetails["film_name"]}</h5>
                        </div>
                    <div className="card-body bg-dark d-flex">
                        {
                            Object.keys(filmScreeningsByDate).map(date => (
                                <div className="col bg-dark d-flex text-white">
                                    <div className="rounded h-50 px-3 text-center bg-gradient align-items-center align-content-center justify-content-center">
                                        <label className="text-center w-100 text-center" >{Date(date).toString().split(" ").slice(0,3).join(" ")}</label>
                                    </div>
                                    <div className="row mx-2">
                                        {filmScreeningsByDate[date].map(screening=>(
                                            <button className="text-decoration-none text-white border-0 btn btn-secondary px-0 mb-2 text-center" onClick={()=>setScreeningId(screening["id"])}>
                                                {`${screening["screening_start_time"].split(":").slice(0,2).join(":")} @ ${screening["theatre"]}`}
                                            </button>
                                        ))}
                                    </div>
                                    
                                </div>
                            ))
                        }
                    </div>
                </div>
                </section>
                <section className="row bg-dark">
                    {
                        seatDetails["A"] && <Seating key={theatreSelected} seatDetails={seatDetails}/>
                }
                </section>
            </div>
        </div>
    )
}