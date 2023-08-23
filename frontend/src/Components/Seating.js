import React, {useState} from "react";
import blueSeats from '../icons/cinemaChairBlue.svg'
import yellowSeats from '../icons/cinemaChairYellow.svg'
import redSeats from '../icons/cinemaChairRed.svg'
import axios from "axios";
import {getCookie} from "../services";

    
export function Seating({seatDetails}){
    const csrfToken = getCookie('csrftoken')
    const [selectedSeats, setSelectedSeats] = useState([])
    
    function postSeatingReservation(){
        axios.post('http://localhost:8000/api/placeholder',{
            seatingReservation: selectedSeats
        },
            {
                headers:{
                    "X-CSRFToken":csrfToken
        }})
    }
    
    function changeImageIcon(id) {
       let img = document.getElementById(id)
       if (img.src !== redSeats) {
           if (!selectedSeats.includes(id)) {
               img.src = yellowSeats
               setSelectedSeats(current => [...current, id])
               console.log(selectedSeats)
               return
           }
           if (selectedSeats.includes(id)) {
               img.src = blueSeats;
               setSelectedSeats(current =>
                   current.filter(item => {
                       return item !== id
                   })
               )
               console.log(selectedSeats)
           }
       }
   }
    return(
        <div className="bg-dark align-items-center ms-5 justify-content-center">
            <table className="my-5" >
                <tbody>
                {Object.keys(seatDetails).map((row, rowIdx)=>(
                    <tr>
                        <td>{row}</td>
                        {seatDetails[row].map(item=>(
                            <td>
                                <img className="w-100 bg-dark m-1 px-1" width="50px" height="50px" src = {!item["hasSeatReserved"]? blueSeats : redSeats} alt={`${row}${item["seat_column"]}`} id={item["id"]} onClick={()=>changeImageIcon(item["id"])} />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <button type="button" className="justify-content-center align-items-center btn btn-primary"onClick={() => postSeatingReservation()}>Submit</button>
        </div>
    )
}
    