import React, { useEffect, useState } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import Projects from './ProjectsComponent';
import Contact from './ContactComponent';
import "../styles/Main.css";

import { Routes, Route, useLocation } from 'react-router-dom';

// Custom hook to scroll to the top on route change
const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // This effect will run when the location changes
};

export default function Main() {
  useScrollToTop(); // Call the custom hook

  return (
    <React.Fragment>
      <Header />
      <div id='page-wrap' className="page-wrap">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </React.Fragment>
  );
}

