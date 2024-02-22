import React, { useEffect, createContext, useContext, useState } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import Projects from './ProjectsComponent';
import Contact from './ContactComponent';
import "../styles/Main.css";

import {Routes, Route, useLocation} from 'react-router-dom';

export default function Main (){
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    
    /* const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setTransitionStage("fadeOut");
    }, [location]); 

    var typing_color;

    if (location.pathname === "/about") {
        typing_color = "color: #aaa";
    } else if (location.pathname === "/projects") {
        typing_color = "color: #f5b0b0";
    } else if (location.pathname === "/contact") {
        typing_color = "color: #aaa";
    } else if (location.pathname === "/") {
        typing_color = "color: #1178AE";
    } else {
        typing_color = "color: #FFF";
    }; */

    return (<React.Fragment>
        <div id="outer-container" /*className={`${transitionStage}`}
        onAnimationEnd={() => { 
            if (transitionStage === "fadeOut") {
                setTransitionStage("fadeIn");
                setDisplayLocation(location);
            }
        }}*/
        >
        <Header /* style={typing_color} *//>
        <div id='page-wrap'>
        <Routes location={displayLocation}>
        <Route exact path='/' element={<Home/> }  />
        <Route path='/about' element={<About/>} />
        <Route path='/projects' element={<Projects/>}  />
        <Route path='/contact' element={<Contact/>}  />
        </Routes>
        
        <Footer/>
        </div>
        </div>
    </React.Fragment>)
}