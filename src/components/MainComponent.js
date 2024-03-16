import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        // Update displayLocation whenever the location changes
        setDisplayLocation(location);
    }, [location]); // Depend on location to trigger the effect

    return (
        <React.Fragment>
                <Header/>
                <div id='page-wrap' className="page-wrap">
                    <Routes location={displayLocation}>
                        <Route exact path='/' element={<Home/>} />
                        <Route path='/about' element={<About/>} />
                        <Route path='/projects' element={<Projects/>} />
                        <Route path='/contact' element={<Contact/>} />
                    </Routes>
                    <Footer/>
                </div>
        </React.Fragment>
    );
}

