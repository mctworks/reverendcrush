import React from 'react';
import {Link} from 'react-router-dom';

function Contact(){
    return (<React.Fragment>
        <h1>All Socials!</h1>
        <p><b>bsky:</b> <a href='https://bsky.app/profile/reverendcrush.com' target="_blank" rel="noreferrer">@reverendcrush.com</a>. In case you missed the two or five links to it on the front page. This one is currently the most updated Social Media I use.</p>
        <p>Mastodon: <a href='https://mastodon.sdf.org/@ReverendCrush' target="_blank" rel="noreferrer">@ReverendCrush@mastodon.sdf.org</a>. Occaisionally updated. If Bsky is down, you'll find me here (and MAYBE TwiX if I feel like I hate myself enough.) The folks who run this instance, the <a href='https://sdf.org/' target="_blank" rel="noreferrer">Super Dimensional Fortress</a>, have been around the Internet since 1987; WELL before Al Gore uttered the words "World Wide Web". If you're looking for a chill Mast instance filled with <i>legitimate</i> internet elders (seriously, I bet these some of these folks were arguing over Usenet as to who Yoda teased "there's is another" to Obi-Wan's force ghost in Jedi WAY back in the 1980's), give them a visit. And give me a follow if you do. Or just follow me if you're into that whole federated thing but don't want to change Mast instances.</p>
        <p>Twi<span class='get-fucked-elon'>X</span>: ReverendCrush. No way in the nine hells am I linking to that shithole. Find me there if Bsky goes down and Mastodon is too much of a headache for you. I'm only there for a few MisterFPGA related accounts.</p>
        <p>Discord DM: I'm usually idle on here, but the best way to privately reach out to me is just "reverendcrush". I'm choosing not to link directly to it is to avoid randos clicking. You should be able to figure out how to contact me that way. Note that I am usually idle, but I'm always on, and will respond to most DMs within a day or two. Might want to ask me via Bsky before adding me, unless I already know you well enough that I'm not going to refuse your request.</p>
        <Link to='/'>HOME</Link>
    </React.Fragment>
    );   
}

export default Contact;