import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import "../styles/Socials.css";

function Contact(){
    useEffect(() => {
        // Add a specific class to the body when the component mounts
        document.body.classList.add('socials-page');

        // Remove the class when the component unmounts
        return () => {
            document.body.classList.remove('socials-page');
        };
    }, []);
    
    return (
        <React.Fragment>
        <section className='sm-plus-list'>
        <h1>All Socials!</h1>
        <h2>Bluesky Social (Bsky)</h2> 
        <a className='sm-link' href='https://bsky.app/profile/reverendcrush.com' target="_blank" rel="noreferrer">@reverendcrush.com</a> 
        <p>In case you missed the two or five links to it on the front page. This one is currently the Social Media platform I use the most. I do follow back, but I have a whole vetting process... so don't take it personally if I don't follow right away. That pretty much applies to any of the other social media platforms.</p>
        <h2>Mastodon</h2> 
        <a className='sm-link' href='https://mastodon.sdf.org/@ReverendCrush' target="_blank" rel="noreferrer">@ReverendCrush@mastodon.sdf.org</a> 
        <p>Occaisionally updated, and when I do, I can usually provide more context. If Bsky is down, you'll find me here (and MAYBE TwiX if I feel like I hate myself enough.)</p><p>The folks who run this instance, the <a href='https://sdf.org/' target="_blank" rel="noreferrer">Super Dimensional Fortress</a>, have been around the Internet since 1987; WELL before Al Gore uttered the words "World Wide Web". If you're looking for a chill Mast instance filled with <i>legitimate</i> internet elders (seriously, I bet these some of these folks were arguing over Usenet as to who Yoda teased "there's is another" to Obi-Wan's force ghost in Jedi WAY back in the 1980's), give them a visit. And give me a follow if you do. Or just follow me if you're into that whole federated thing but don't want to change Mast instances.</p>
        <h2>Discord (DM)</h2> 
        <p>I'm usually idle on here, but the best way to privately reach out to me is just "reverendcrush". I'm choosing not to link directly to it is to avoid randos clicking. You should be able to figure out how to contact me with just that if you know your way around Discord and aren't a bot. Note that I am usually idle, but I'm always on, and will respond to most DMs within a day or two. Might want to ask me via Bsky before adding me, unless I already know you well enough that I'm not going to refuse your request.</p>
        <p>I have a few hangout spots, but... I'm not super active in any of them. Maybe that'll change once I'm allowed to have a break...</p>
        <h2>Cohost</h2>
        <a className='sm-link' href='https://cohost.org/ReverendCrush' target="_blank" rel="noreferrer">ReverendCrush</a>
        <p>This admittedly hasn't been active hardly since I got it. I haven't felt compelled to do long form work in a very long time. Not even game reviews. But I'm hoping that changes. If I do, I'll update this listing and announce it on the usual channels.</p>
        <h2>Twi<span className='get-bent-elon'>X</span></h2> 
        <p>It's @ReverendCrush. No way in the nine hells am I linking to the house Elon destroyed in a massive Special-K fueled bender, even if it is my account. Find me there if Bsky goes down and Mastodon is too much of a headache for you. I'm only there for a few MisterFPGA related accounts, but even then I'm only checking once in a blue moon. I don't see this shithole getting any better, so there's a good chance I might just end up deleting it soon.</p>
        <h2>Anything by Meta</h2> 
        <p>Don't bother...</p>
        <h2>Snapchat?</h2> 
        <p>Nope. I'm a middle-aged hermit who plays old video games, codes, subscribes to a denomination of Taoism/Buddhism that takes The Big Lebowski literally, but somehow manages to have a busy schedule. What am I supposed to do with Snapchat?</p>
        <h2>TikTok!?</h2>
        <p>DO I LOOK LIKE A 12-YEAR OLD GIRL WITH ANY INTEREST IN DANCES!?</p>
        <h2>SomethingAwful Forums!?!?!!?</h2>
        <p><i>(no comment)</i></p>
        </section>
        <Link to='/'>HOME</Link>
    </React.Fragment>
    );   
}

export default Contact;