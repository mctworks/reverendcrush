import React, { useEffect } from 'react';
import Link from 'next/link';

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
        <h2>Reddit</h2>
        <a className='sm-link' href='https://www.reddit.com/user/ReverendCrush/'>u/ReverendCrush</a>
        <p>I'm active-ish. You'll probably see me pipe in on r/NES, r/SNES, and r/Retrogaming once in a blue moon. Honestly not a huge redditor.</p>
        <p>Do they still call them "redditors"?</p>
        <h2>Twi<span className='get-bent-elon'>X</span></h2> 
        <p><strike>It's @ReverendCrush</strike> oh, whoopsie-doodle, I deactivated. You might see some stuff from the "Twitter" archives pop up on other social media platforms down the road. Stay tuned...</p>
        <h2>Anything by Meta</h2> 
        <p>Don't bother...</p>
        <h2>Snapchat?</h2>
        <p>Nope. I'm a middle-aged hermit who plays old video games, codes, subscribes to a denomination of Taoism/Buddhism that takes The Big Lebowski literally, but somehow manages to have a busy schedule. What am I supposed to do with Snapchat?</p>
        <h2>TikTok!?</h2>
        <p>Same situation as Snapchat. I'm not their demographic. I'm not even sure what their demographic is, but I'm pretty sure it's not me.</p>
        <h2>We don't know why we're bothering to ask, but LinkedIn?</h2> 
        <p>The LinkedIn crowd isn't exactly my cup of yerba mate, and I don't think I'm their's. I'm the kind of person who, when asked by his boss "Who's your role model?" in a company meeting, I answer "dril" right before they learn who that is, and I'm required to point out how many professional accounts follow dril and then blow the boss' mind while probably saving my job. You really don't want me anywhere near LinkedIn, despite my workaholism.</p> 
        <p>However, my buddy who coded a huge chunk of this webpage plus the BlueSky section on the front page, MCT630 (formerly mctworks) is somewhere on there. If you're looking for a web dev and like what you see here, he's the one to speak to. He's requested I not link directly to his LinkedIn, but it's on <a href="https://mct630.com" target="_blank" rel="noreferrer">his website</a>.</p>
        <h2>Something Awful Forums?</h2>
        <p><i>{'(no comment)'}</i></p>
        <Link href='/'>RETURN TO MAIN</Link>
        </section>
    </React.Fragment>
    );   
}

export default Contact;