import React from 'react';
import {Link} from 'react-router-dom';
import "../styles/Projects.css";

function Projects(){
    return (<React.Fragment>
        <h1>FOR FUN - Under Construction</h1>
        <p>Hey duders, sorry to get your hopes up, but this section is currently under construction. Technically, it wasn't even supposed to be a part of the soft launch, but the code was already there, so I didn't want to just go through the trouble of excluding the page because that would have been a bigger pain in the ass. I do have plans for this page, but we're talking really far... Far... FAR... <i>FAR</i> down the pipeline, as everyone involved in this project either have dayjobs or are making looking for work a dayjob. But I don't want to leave you all empty handed until I can pump some <i>actually fun</i> little projects that I have planned.</p>
        <p>In the meantime, feel free to take a look at this old Brutal Retrogaming Quiz I cobbled together some years ago. The actual work that went into it is pretty boilerplate, but the actual quiz is aimed to be insanely difficult, even for the most grizzled hardcore, Kusoge/Bakage-loving, PCB-collecting, <a href="https://tcrf.net" target="_blank" rel="noopener noreferrer">TCRF.net</a> article-binging Retrogaming Enthusiast.</p>
        <p>It's not much, but it's something to do while you wait for me to get my act together. </p>
        <button>Brutal Retrogaming Quiz</button>
        <Link to='/'>Home</Link>
    </React.Fragment>);   
}

export default Projects;