import React from 'react';
import {Link} from 'react-router-dom';
import "../styles/Projects.css";

function Projects(){
    return (<React.Fragment>
        <h1>Projects</h1>
        <div class='project-bg'><div class='project-name'>Project 1</div></div>
        <div class='project-name'>Project 2</div>
        <div class='project-name'>Project 3</div>
        <div class='project-name'>Project 4...</div>
        <Link to='/'>Home</Link>
    </React.Fragment>);   
}

export default Projects;