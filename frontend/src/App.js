import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "./Components/HomePage";
import {SignUpPage} from "./Components/SignUpPage";
import {LoginPage} from "./Components/LoginPage";
import {AccountPage} from "./Components/AccountPage";
import {FilmDetails} from "./Components/FilmDetails";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={HomePage}/>
                <Route path='/SignUp' Component={SignUpPage}/>
                <Route path='/Login' Component={LoginPage}/>
                <Route path='/accountControls' Component={AccountPage}/>
                <Route path='/film/:imdb_id' Component={FilmDetails}/>
            </Routes>
        </BrowserRouter>
    )
}
