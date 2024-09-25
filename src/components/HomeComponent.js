import React from 'react';
import {Link} from 'react-router-dom';
import "../styles/Home.css";
import BlueskySocial from './BlueskyComponent';

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
        <Link to='/contact'>SO<span className="flicker">CIA</span><span className="fast-flicker">LS</span></Link><br />
        <Link to='/projects'>FO<span className="fast-flicker">R </span><span className="flicker">F<span className="about_U flicker">u</span></span>N</Link><br />
        <Link to='/about' >B<span className="fast-flicker">I</span><span className="flicker">O</span></Link><br />
        </section>        
        </div>
    </React.Fragment>);   
}

export default Home;
