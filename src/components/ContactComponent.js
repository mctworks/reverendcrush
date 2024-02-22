import React from 'react';
import {Link} from 'react-router-dom';

function Contact(){
    return (<React.Fragment>
        <h1>All Socials!</h1>
        <h2>bsky: @reverendcrush.com</h2>
        <h2>Mastodon: XX</h2>
        <h2>TwiX: ReverendCrush</h2>
        <h2>Discord DM: ReverendCrush</h2>
        <Link to='/'>HOME</Link>
    </React.Fragment>
    );   
}

export default Contact;