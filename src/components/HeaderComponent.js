import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Typed from "typed.js";
import { pushRotate as Menu } from 'react-burger-menu';
import Image from 'next/image';

export default function Header() {
    console.log("Header is rendering");

    const el = useRef(null);
    const typedRef = useRef(null);
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const stringsMap = {
            "/about": ">> REVCRSH_BIO: A little about about me, Dr. Reverend Crush!",
            "/projects": ">> REVCRSH_FUN: UNDER CONSTRUCTION!",
            "/contact": ">> REVCRSH_SOC: All of my socials, plus more!",
            "/blog": ">> REVCRSH_BLG: Welcome to The Dude's Soapbox!",
            "/blog/[id]": ">> REVCRSH_BLG: Welcome to The Dude's Soapbox!",
            "/": ">> REVCRSH_HOM: Hey Duders! Enjoy your visit!",
        };
        const defaultString = ">> //ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R ERR0R";
        const strings = [stringsMap[router.pathname] || defaultString];

        if (typedRef.current) {
            typedRef.current.destroy(); // Destroy previous instance to avoid conflicts
        }

        typedRef.current = new Typed(el.current, {
            strings: strings,
            typeSpeed: 50,
            onComplete: (self) => {
                const cursorElement = document.querySelector('.typed-cursor');
                if (cursorElement) {
                    cursorElement.style.display = 'inline';
                }
            },
        });

        return () => {
            if (typedRef.current) {
                typedRef.current.destroy();
            }
        };
    }, [router.pathname]);

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);

        if (state.isOpen) {
            const scrollY = window.scrollY;
            document.querySelector('.bm-menu-wrap').style.top = `${scrollY}px`;
            document.body.classList.add('no-scroll');
        } else {
            document.querySelector('.bm-menu-wrap').style.top = "0px";
            document.body.classList.remove('no-scroll');
        }
    };

    useEffect(() => {
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className="header">
            <div className="autotext header_title" ref={el}></div>
            <div className="header_nav">
                <Menu
                    right
                    noOverlay
                    width={'29.5%'}
                    height={'100%'}
                    isOpen={menuOpen}
                    onStateChange={handleStateChange}
                    pageWrapId={"page-wrap"}
                    outerContainerId={"outer-container"}
                >
                    <Image
                        className="nav-logo"
                        src="/img/dudeist_yinyang.png"
                        alt='ReverendCrush.com'
                        width={50}
                        height={50}
                    />
                    <Link href='/' className="nav_link" onClick={closeMenu}>
                        Main
                    </Link>
                    <Link href='/blog' className="nav_link" onClick={closeMenu}>
                        Blog
                    </Link>
                    <Link href='/contact' className="nav_link" onClick={closeMenu}>
                        Socials
                    </Link>
                    <Link href='/projects' className="nav_link" onClick={closeMenu}>
                        For Fun
                    </Link>
                    <Link href='/about' className="nav_link" onClick={closeMenu}>
                        Bio
                    </Link>
                </Menu>
            </div>
        </div>
    );
}
