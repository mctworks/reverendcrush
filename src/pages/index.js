import React from 'react';
import Link from 'next/link';
import BlueskySocial from '../components/BlueskyComponent';

function Home(){

    return (<React.Fragment>
        <header>
        <p className="h1-mini">Hey kids! It's</p>
        <h1 className='brand'>ReverendCrush<span className="h1-mini">.com</span>!</h1>
        </header>
        <div className='home-links'>
        <BlueskySocial/>
        <section className="link-list">
        <h2>Site Attractions</h2>
        <Link href='/blog'>B<span className="flicker">LO</span><span className="fast-flicker">G</span></Link><br />
        <Link href='/contact'>SO<span className="flicker">CIA</span><span className="fast-flicker">LS</span></Link><br />
        <Link href='/projects'>FO<span className="fast-flicker">R </span><span className="flicker">F<span className="about_U flicker">u</span></span>N</Link><br />
        <Link href='/about' >B<span className="fast-flicker">I</span><span className="flicker">O</span></Link><br />
        </section>        
        </div>
    </React.Fragment>);   
}

export default Home;
