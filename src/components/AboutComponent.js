import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import "../styles/Bio.css";
import shitpic from "../img/dudecommission_hunty.jpg";

function About(){
    useEffect(() => {
        // Add a specific class to the body when the component mounts
        document.body.classList.add('bio-page');

        // Remove the class when the component unmounts
        return () => {
            document.body.classList.remove('bio-page');
        };
    }, []);

    return (<React.Fragment>
        <section className='bio'>
        <h1>Bio</h1>
        <img className="shitpic"src={shitpic} alt='Poorly colored lineart of Reverend Crush yelling "SHIT!" at a glowing monitor with a stylized "GAME OVER" on the screen.'/>
        <p>Dr. Reverend Crush, PHD {`(formerly going under the screenname "Ichiban Crush")`}, or "Rev",
        "Crush", or "dude over there" is just one very tiny voice that has been screaming in the Retrogaming scene 
        since 1999. While he has been a part of many different projects, the only major thing of notice
        was some minor contributions to <a href="https://www.vgmuseum.com/" target='_blank' rel='noreferrer'>VGMuseum.com</a> in addition to
        the spritual predecessor to the <a href='https://gamehistory.org/' target='_blank' rel='noreferrer'>Video Game History Foundation</a>, <b>Lost Levels</b>, as well as a few unsuccessful solo ventures until getting burned out in the early 2010's.</p>
        <p>After life getting in the way with marriage and returning to college after giving up on any kind of 
        career in writing, he went on a bit of a spiritual journey that lead him to the path of becoming an 
        ordained priest of the <a href='https://dudeism.com/' target='_blank' rel='noreferrer'>Church of the Latter-Day Dude</a> {`(Dudeism)`}.
        Professionally, he works in web development, and wishes to someday use this platform to potentially showcase
        fun projects {`(hopefully with more collaborators)`}. While he still has the same love of video games he always has, both modern and vintage, he doesn't wish to dedicate a 
        career in the field, or even covering them, as he finds anything remotely involving the video game industry absolutely
        exhausting and overwhelming. Also, while he subscribes to the Dudeist philosophy, Reverend Crush has a very
        strong belief against going out of his way to convert folks, because while he's not lazy like The Dude,
        he doesn't have the time, or really desire, to do so. However, he is available for weddings if you're
        in the Atlanta metro area!
        </p>
        <p>Reverend Crush also holds a PhD in the field of Pop Cultural Studies from <a href="https://aui.me/" target='_blank' rel='noreferrer'>Abide University</a>. Oh! For you old folks that remember him under his old screenname, he stopped drinking like a fish 
        back in 2015. So while he's unable to enjoy the ceremonial White Russian strongly tied to his "religion"'s culture,
        he felt that it was time to switch away from a screenname best known to half the folks that knew of him for a short-lived MS Paint 
        shitpost-webcomic he worked on during alcoholic benders right after 9/11 when none of the other webcomics were updating. 
        He decided go with something that was more in line with his current spiritual beliefs... which honestly, is more about just taking it easy. These days, when he's not going
        absolutely ham on <a href="https://bsky.app/profile/reverendcrush.com" target='_blank' rel='noreferrer'>BlueSky</a>, he's playing something from his enormous backlog. He's a huge fan of FPGA gaming, and can often be
        found in his office on his MiSTerFPGA, playing some random PC Engine Super CD game or whatever latest arcade core... as long as it doesn't require him to
        turn his CRT television sideways. He still likes to dive in the world of Kusoge and Bakage {`("shit game" and "dumb game" respectively)`},
        but he also has a deep appreciation for Baldur's Gate 3, as well as many other modern games that he thankfully has spared the copywriters here the pain of having to list.</p>
        <p>Did you ever play the MegaMan games on NES and wonder why MegaMan wouldn't have all of the robot powers he obtained from previous games in any of the sequels? Want to learn more about the meme status of Culture Brain in Japan? Well Rev could probably help you with some of that, but we don't think he'll actually get around to doing that here.</p>
        <p><Link to='/'>BACK TO MAIN</Link></p>
        </section>
    </React.Fragment>
    );   
}

export default About;