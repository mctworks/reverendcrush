import React, { useRef, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Typed from "typed.js";
import "../styles/Header.css";
import {pushRotate as Menu} from 'react-burger-menu';
import logo from '../img/dudeist_yinyang.png';

var header_txt ="";
const el = "";
export const killTyped = () => el.destroy(); //removes the currently displayed autotext. ALSO changes body bg and text colors as well as navbar's color scheme. Include this anytime there's a change in primary page paths e.g. as an onClick action for links to other pages

export default function Header(){
    // Handles autotext using Typed.js
    if (header_txt !== null){
        header_txt = "";
    }

    const header_strings = [">> REVCRSH_HOM: Hey Duders! Enjoy your visit!", 
    ">> REVCRSH_FUN: Fun stuff that the Rev cobbled together.", 
    ">> REVCRSH_BIO: COMING SOON!", 
    ">> REVCRSH_CON: Ways to contact His Royal Dudeness other than bsky."];
    const el = useRef(null);
    let location = useLocation();

    console.log(location.pathname);
    useEffect(() => {
        if (location.pathname === "/about") {
            //About Page (2/28 - Not yet designed, placeholder colors)
            header_txt = header_strings[1];
        } else if (location.pathname === "/projects") {
            //Projects Page
            header_txt = header_strings[2];
        } else if (location.pathname === "/contact") {
            //Contact Page
            header_txt = header_strings[3];
        } else if (location.pathname === "/") {
            //HOME PAGE HERE!
            header_txt = header_strings[0];
        } else {
            header_txt = ">> //ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R";
        };

        var typed_header = new Typed(el.current, {
          strings: [header_txt],
          startDelay: 300,
          typeSpeed: 5,
          loop: false,
          showCursor: true,
          cursorChar: "_",
          onDestroy: function(self) {console.log('onDestroy' + self)}
        });
    
        // Destropying
        return () => {
          typed_header.destroy(); 
        };
      }, []);

    return (
    <div className="header">
        <div className="autotext">
        <span ref={el} className="header_title" id="header-txt" />
        </div>
        <div className="header_nav">
        <Menu right noOverlay width={ '29.5%' } height={ '100%' } pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
            <img className="nav-logo" src={logo} alt='ReverendCrush.com' />
            <Link className="nav_link" onClick={ killTyped } to='/'>Main </Link>
            <Link className="nav_link" onClick={ killTyped } to='/contact'>Socials</Link>
            <Link className="nav_link" onClick={ killTyped } to='/projects'>For Fun</Link>
            <Link className="nav_link" onClick={ killTyped } to='/about'>Bio</Link>
        </Menu>
        </div>
    </div>      
        );
}