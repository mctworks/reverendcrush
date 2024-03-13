import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typed from "typed.js";
import "../styles/Header.css";
import { pushRotate as Menu } from 'react-burger-menu';
import logo from '../img/dudeist_yinyang.png';

export default function Header() {
    const el = useRef(null);
    const typedRef = useRef(null); // Use this ref to store the Typed instance
    let location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false); // State to control menu open/close

    useEffect(() => {
        const stringsMap = {
            "/about": ">> REVCRSH_BIO: A little about about me, Dr. Reverend Crush!",
            "/projects": ">> REVCRSH_FUN: UNDER CONSTRUCTION!",
            "/contact": ">> REVCRSH_SOC: All of my socials, plus more!",
            "/": ">> REVCRSH_HOM: Hey Duders! Enjoy your visit!",
        };
        const defaultString = ">> //ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R";
        const strings = [stringsMap[location.pathname] || defaultString];

        // Initialize Typed instance and store it in typedRef
        typedRef.current = new Typed(el.current, {
            strings: strings,
            typeSpeed: 50,
            onComplete: (self) => {
                // Attempt to adjust cursor style directly after Typed.js initialization
                const cursorElement = document.querySelector('.typed-cursor');
                if (cursorElement) {
                    cursorElement.style.display = 'inline';
                    // Additional style adjustments can be made here if necessary
                }
            },
        });

        // Cleanup function to destroy Typed instance on component unmount or before creating a new instance
        return () => {
            if (typedRef.current) {
                typedRef.current.destroy();
            }
        };
    }, [location.pathname]); // Re-run effect when location changes

    // Define killTyped function to manually stop Typed animation
    const killTyped = () => {
        if (typedRef.current) {
            typedRef.current.destroy();
            typedRef.current = null;
        }
    };

    // Function to handle menu state change
    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };

    // Function to close menu
    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className="header">
            <div className="autotext header_title" ref={el}></div>
            <div className="header_nav">
                <Menu right noOverlay width={'29.5%'} height={'100%'} pageWrapId={"page-wrap"} outerContainerId={"outer-container"} isOpen={menuOpen} onStateChange={handleStateChange}>
                    <img className="nav-logo" src={logo} alt='ReverendCrush.com' />
                    <Link className="nav_link" to='/' onClick={closeMenu}>Main </Link>
                    <Link className="nav_link" to='/contact' onClick={closeMenu}>Socials</Link>
                    <Link className="nav_link" to='/projects' onClick={closeMenu}>For Fun</Link>
                    <Link className="nav_link" to='/about' onClick={closeMenu}>Bio</Link>
                </Menu>
            </div>
        </div>
    );
}
