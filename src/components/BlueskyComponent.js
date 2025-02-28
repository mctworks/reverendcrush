import React, { useEffect, useState } from 'react';
import { BskyAgent } from '@atproto/api';
import YouTube from 'react-youtube';
import noMediaImg from "../img/no_media_img.jpg";
import HLSVideoPlayer from './HLSVideoPlayer';
import Image from 'next/image';

const getYouTubeUri = (post) => {
  // Define all possible paths to the uri
  const paths = [
    post.post?.embed?.media?.external?.uri,
    post.post?.embed?.external?.uri,
    // Add more paths as needed
  ];

  // Iterate over the paths and return the first valid URI
  for (const path of paths) {
    if (typeof path === 'string') {
      return path;
    }
  }

  // Return null if no valid URI is found
  return null;
};

const getPostYoutubeId = (url) => {
  let id = '';
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(new URL(url).search);
    id = urlParams.get('v');
  } else if (url.includes('youtu.be')) {
    id = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('youtube.com/shorts')) {
    id = url.split('youtube.com/shorts/')[1].split('?')[0];
  }
  return id;
};

function calculateBangerScore(post) {
  let score = post.likeCount * 200 + post.replyCount * 300 + post.repostCount * 500;
  score += Math.floor(post.likeCount / 10) * 700;
  score += Math.floor(post.replyCount / 25) * 2500;
  score += Math.floor(post.repostCount / 5) * 2000;

  // Check for Ratio Penalty
  let ratioPenalty = false;
  if (post.replyCount >= 25 && post.replyCount > (post.likeCount * 0.95)) {
    const penaltyFactor = Math.round((post.replyCount * 0.95) / (post.likeCount || 1));
    score -= penaltyFactor * 500;
    ratioPenalty = true;
  }

  return { score, ratioPenalty };
}

function getFlavorText(score) {
  if (score < 400) return "Welp, this doesn't seem like a banger, now does it?";
  if (score >= 400 && score < 800) return "Engagement exists, but this isn't a banger.";
  if (score >= 800 && score < 3000) return "A few folks appreciate this, it seems...";
  if (score >= 3000 && score < 4200) return "It's a banger by small account standards, but it's still a banger!";
  if (score === 4200) return "420 x 10 BANGER!";
  if (score > 4200 && score < 6900) return "Now THIS is a hell of a BANGER!";
  if (score === 6900) return "69-hundred BANGER! NICE!";
  if (score > 6900 && score < 9000) return "Not a SUPER Banger, but almost...";
  if (score === 9000) return "One point away from OVER 9000..."
  if (score > 9000 && score < 20000) return "THIS BANGER IS OVER 9000!!!!!";
  if (score >= 20000 && score < 35000) return "THIS QUALITY SUPER BANGER IS GOING PLACES!!!!";
  if (score >= 35000 && score < 42000) return "IT'S A SUPER BANGER LEVEL 3!!!! ";
  if (score === 42000) return "DANK 420 x 100 SUPER BANGER LEVEL 3!";
  if (score > 42000 && score < 66600) return "ALL THE HOT PEOPLE ARE GETTING WET OVER THIS SUPER BANGER LEVEL 3!!!";
  if (score === 66600) return "SATANIC 666 x 100 SUPER BANGER LEVEL 3! HAIL LUCIFER THE MORNING STAR!";
  if (score > 66600 && score < 69000) return "ALL THE HOT PEOPLE ARE GETTING WET OVER THIS SUPER BANGER LEVEL 3!!!";
  if (score === 69000) return "69 thousand SUPER BANGER LEVEL 3! NICE!";
  if (score > 69000 && score < 75000) return "THIS QUALITY SUPER BANGER LEVEL 3 IS STARTING TO GLOW OF ELECTRIC SEX! Could we see GOLD here!?";
  if (score >= 75000 && score < 125000) return "PURE GOLDEN SUPER BANGER!!! FUCKING RADICAL!";
  if (score >= 125000 && score < 250000) return "I can't believe this... A PLATINUM BANGER!!!!";
  if (score >= 250000 && score < 420000) return "HOLY SHIT!! DOUBLE PLATINUM BANGER!!!!";
  if (score === 420000) return "SUPER DANK 420 x 100 DOUBLE PLATINUM BANGER!!!! BLAZE IT!!! AND SCREENSHOT THIS!";
  if (score > 420000 && score < 500000) return "HOLY SHIT!! DOUBLE PLATINUM BANGER!!!!";
  if (score >= 500000 && score < 690000) return "A TRIPLE PLATINUM BANGER!!!!??? THESE ARE LIKE THE NUMBERS FROM AN OLD EVERGREEN DRIL TWEET MARINATING IN TWELVE YEARS OF CIRCULATION!!";
  if (score === 690000) return "69 hundred-thousand TRIPLE PLATINUM! NICE! SCREENSHOT THIS AFTER YOU JIZZ!";
  if (score > 690000 && score < 1500000) return "A TRIPLE PLATINUM BANGER!!!!??? THESE ARE LIKE THE NUMBERS FROM AN OLD EVERGREEN DRIL TWEET MARINATING IN TWELVE YEARS OF CIRCULATION!!";
  if (score >= 2500000) return "EVERYONE MUST BE IN HEAT AND EXPOSING THEIR WET CROTCHES IN THE PRESENCE OF THIS SKEET, BECAUSE THIS IS LIKE A COSMIC LEVEL BANGER!";
  return "Engagement exists? We might have an error."; // Default case
}

// Function to render text content with Japanese styling and username links
const renderTextContent = (textContent) => {
  // Function to split text into Japanese and non-Japanese segments
  const splitJapaneseText = (text) => {
    const regex = /([\u3000-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF\u3400-\u4DBF]+)/;
    return text.split(regex).filter(Boolean); // Split and remove empty strings
  };

  return parseText(textContent).flatMap((part, index) => {
    // Check if the part is a string
    if (typeof part === 'string') {
      // Split the string into segments of Japanese and non-Japanese text
      const segments = splitJapaneseText(part);
      return segments.map((segment, segmentIndex) => {
        // Apply 'DotGothic16' font only to Japanese text segments
        if (/[\u3000-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF\u3400-\u4DBF]+/.test(segment)) {
          return <span lang="ja" key={`${index}-${segmentIndex}`} style={{ fontFamily: 'DotGothic16', fontSize: '16px', lineHeight: '2rem' }}>{segment}</span>;
        } else {
          return segment;
        }
      });
    } else {
      // Return non-string parts (e.g., JSX elements from parseText) unchanged
      return <React.Fragment key={index}>{part}</React.Fragment>;
    }
  });
};

const parseText = (text) => {
  if (!text) return []; // Ensure an empty array is returned if there's no text
  const usernameRegex = /@(\w+(?:\.\w+)*)(?=[^\w.@]|$)/g;
  const parts = [];
  let match;
  let lastIndex = 0;

  // Find all username matches and push text and links into parts array
  while ((match = usernameRegex.exec(text)) !== null) {
    // Push text before username
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Push username link
    const username = match[1];
    parts.push(<a href={`https://bsky.app/profile/${username}`} target="_blank" rel="noreferrer">@{username}</a>);
    lastIndex = usernameRegex.lastIndex;
  }

  // Push remaining text after the last username
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

const renderVideoEmbed = (embed) => {
  if (!embed || !embed.$type.startsWith('app.bsky.embed.video')) return null;

  const aspectRatio = embed.aspectRatio || { width: 16, height: 9 };

  return (
    <HLSVideoPlayer
      src={embed.playlist}
      poster={embed.thumbnail}
      aspectRatio={aspectRatio}
    />
  );
};

const BlueskySocial = () => {
  const HANDLE = 'reverendcrush.com'; //Your Bsky handle. If you're using a default, it's something like YOURNAME.bsky.social
  const APP_PASSWORD = 'ikj4-v76d-w3ib-y3kg'; //Your Bsky App Password. BE SURE TO USE AN APP PASSWORD SET UP THROUGH BSKY and not your standard password.
  const SERVICE_URL = 'https://bsky.social';

  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [error, setError] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardPosts, setLeaderboardPosts] = useState([]);
  

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const agent = new BskyAgent({ service: SERVICE_URL });
      const { data: { did } } = await agent.resolveHandle({ handle: HANDLE });
      await agent.login({ identifier: did, password: APP_PASSWORD });
      const { data } = await agent.getAuthorFeed({
        actor: did,
        filter: 'posts_and_author_threads',
        limit: 100, //If you want to set a lower limit, you can do so here. The max is 100 posts.
      });

      if (Array.isArray(data.feed)) {
        // Set posts in their original order for the default view
        setPosts(data.feed);

        // Calculate scores for leaderboard without altering original posts array
        const scoredPosts = data.feed.map(post => ({
          ...post,
          scoreDetails: calculateBangerScore(post.post),
        }));

        // Sort by score for the leaderboard and take the top 25
        const topScoredPosts = [...scoredPosts].sort((a, b) => b.scoreDetails.score - a.scoreDetails.score).slice(0, 25);
        setLeaderboardPosts(topScoredPosts);
      } else {
        console.error('Invalid feed data format:', data.feed);
        setError('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  }

  const handleNext = () => {
    setCurrentPostIndex(prevIndex => Math.min(prevIndex + 1, posts.length - 1));
    document.getElementById('bsky-top').scrollIntoView({ behavior: 'smooth' });
};

const handlePrevious = () => {
    setCurrentPostIndex(prevIndex => Math.max(prevIndex - 1, 0));
    document.getElementById('bsky-top').scrollIntoView({ behavior: 'smooth' });
};

  const toggleLeaderboard = async () => {
    setShowLeaderboard(!showLeaderboard);
  };

  if (error) {
    return <div className='bsky-home skeet-text'>BlueSky Error: {error}</div>;
  }
//LEADERBOARD JSX HERE!!
if (showLeaderboard) {
  return (
    <div className='bsky-home'>
      <div className='bsky-latest'><h2>SKEET LEADERBOARD</h2>
      <p className='bsky-text'>TOP 25 BSKY BANGERS VIA @REVERENDCRUSH.COM</p>
      <button className='bsky-lb-button' onClick={toggleLeaderboard}>GO BACK</button>
    </div>
      <div className='bsky-lb'>
      <ul className='bsky-lb-list'>
        {leaderboardPosts.map((post, index) => (
          <li className={`${index === 0 ? 'first-place-li' : index === 1 || index === 2 ? 'runnerup-li' : index >= 3 && index <= 9 ? 'bottom10-li' :  ''}`} key={index}>
            {/* Display the user's avatar. If it's a quoted post, both users' avatars appear, but goes by the score of the original post. Classes are added based on position. Also, the date of the post should show up next to the avatar(s) */}
            <Image src={post.post?.author?.avatar} alt={`${post.post?.author?.handle}'s avatar`} className={`author-avatar ${index === 0 ? 'first-author-avatar' : index === 1 || index === 2 ? 'runnerup-author-avatar' : index >= 3 && index <= 9 ? 'bottom10-author-avatar' : ''}`} width={500} height={300} />
            {post.post?.embed?.record && (
              <Image src={post.post?.embed?.record?.author?.avatar || post.post?.embed?.record?.record?.author?.avatar} 
                   alt={`${post.post?.embed?.record?.author?.handle || post.post?.embed?.record?.record?.author?.handle}'s avatar`} 
                   className={`author-avatar ${index === 0 ? 'first-author-avatar' : index === 1 || index === 2 ? 'runnerup-author-avatar' : index >= 3 && index <= 9 ? 'bottom10-author-avatar' :  ''}`} width={500} height={500} />
            )}<span className='bsky-lb-date'>{new Date(post.post?.record?.createdAt).toLocaleDateString()}</span>
            
            {/* Display the user's handle. If it's a quoted post, both users are show unless it's a self-quote. Score is based on the original post. Classes based on postion are placed. */}
            <div className='bsky-lb-entry-wrapper'>
            <div className='bsky-lb-user-deets'>
              <p className={`bsky-lb-handle ${index === 0 ? 'first-handle' : index === 1 || index === 2 ? 'runnerup-handle' : index >= 3 && index <= 9 ? 'bottom10-handle' :  ''}`}>
              <a href={`https://bsky.app/profile/${post.post?.author?.handle}`} target="_blank" rel="noreferrer">@{post.post?.author?.handle}</a>
            </p>
            {(post.post?.embed?.record && (post.post?.embed?.record?.author?.handle || post.post?.embed?.record?.record?.author?.handle) !== post.post?.author?.handle) && (
              <p className={`bsky-lb-handle ${index === 0 ? 'first-handle' : index === 1 || index === 2 ? 'runnerup-handle' : index >= 3 && index <= 9 ? 'bottom10-handle' :  ''}`}>
                <a href={`https://bsky.app/profile/${post.post?.embed?.record?.author?.handle || post.post?.embed?.record?.record?.author?.handle}`} target="_blank" rel="noreferrer">
                  @{post.post?.embed?.record?.author?.handle || post.post?.embed?.record?.record?.author?.handle}
                </a>
              </p>
            )}

            {/* This will display the first 120 characters of either the post or the alt text of the first image (if no actual post text is available) linked to the post on Bsky. If the post doesn't actually contain either, e.g. an image without Alt Text, it'll provide a short '[THIS POST CONTAINS NO TEXT]' string that will link to the post. */}
            {post.post?.record?.text ? (
            <a className="bsky-lb-postsnip" href={`https://bsky.app/profile/${post.post?.author?.handle}/post/${post.post?.uri.split('/').pop()}`} target="_blank" rel="noreferrer">
              {post.post?.record?.text.slice(0, 120)}
            </a>) : (post.post?.embed?.images?.[0]?.alt || post.post?.embed?.media?.images?.[0]?.alt) ? (
              <a className="bsky-lb-postsnip" href={`https://bsky.app/profile/${post.post?.author?.handle}/post/${post.post?.uri.split('/').pop()}`} target="_blank" rel="noreferrer">
              {'//IMG ALT TEXT: '}{(post.post?.embed?.images?.[0]?.alt || post.post?.embed?.media?.images?.[0]?.alt).slice(0, 120)}
            </a>) :
              <a className="bsky-lb-postsnip" href={`https://bsky.app/profile/${post.post?.author?.handle}/post/${post.post?.uri.split('/').pop()}`} target="_blank" rel="noreferrer">
              {'[THIS POST CONTAINS NO TEXT]'}
            </a>
            }
            </div>

            {/* Score is always displayed. There are classes added based on position on the board. */}
            <div className='bsky-lb-score-area'>
            <p className={`bsky-lb-score ${index === 0 ? 'first-score' : index === 1 || index === 2 ? 'runnerup-score' : index >= 3 && index <= 9 ? 'bottom10-score' :  ''}`}>SCORE: {post.scoreDetails?.score}</p>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className='bsky-lb-bottom bsky-text'>
      <p>Entries for this leaderboard are pulled from the last 100 posts made by @ReverendCrush.com on BlueSky Social, including reskeets and quote reskeets. Banger Scores are calculated based on engagement on Bsky. The more likes, comments, and reskeets a skeet gets, the higher the score!</p><p>Sounds weird? IT IS! Especially considering it's just my posts along with much more popular people than I really care to be! But if for some reason you want engage in this weird experiment, be sure to follow <a href="https://bsky.app/profile/reverendcrush.com" target="_blank" rel="noreferrer">@ReverendCrush.com</a> on Bsky.</p>
      <div className="flex-center"><button className='bsky-lb-button' onClick={toggleLeaderboard} href="bsky-top"> GO BACK TO SKEETS</button></div>
    </div>
  </div>
  );
}
//END OF LEADERBOARD JSX. The initial paginated Bsky author post feed code starts here.
if (posts.length === 0) {
  return <div className='bsky-home skeet-text'><Image src='/img/loading-hourglass.gif' alt='Loading some skeets, dude...' width={35} height={35} /> Loading some skeets, dude...</div>;
}

const currentPost = posts[currentPostIndex];
const youtubeUri = getYouTubeUri(currentPost);
const isYoutubeUri = youtubeUri !== null && (youtubeUri.includes('youtube.com') || youtubeUri.includes('youtu.be'));
const youtubeVideoId = isYoutubeUri ? getPostYoutubeId(youtubeUri) : null;
console.log('currentPost:', currentPost);
console.log('Images:', currentPost.post.embed?.media?.images);
console.log('Main post embed type:', currentPost.post.embed?.$type);

if (!currentPost || !currentPost.post || !currentPost.post.record) {
  console.error("Current post is undefined or missing the record property:", currentPost);
  return <div className='bsky-home skeet-text'>Error loading skeet...</div>;
}

// Check if there are labels at the post level or the record level and if they contain any items
const hasContentWarning = (currentPost.post?.labels?.length > 0 || currentPost.post?.record?.labels?.length > 0);  
const quoteHasContentWarning = (currentPost.post?.embed?.record?.labels?.length > 0 || currentPost.post?.embed?.record?.record?.labels?.length > 0);

const { score, ratioPenalty } = calculateBangerScore(currentPost.post);
const flavorText = getFlavorText(score);

return (
  <section className='bsky-home' id="bsky-top">
    <div className='bsky-latest'><h2>Latest from the Bsky</h2>
    </div>
    <div className='skeet-header'>
        {/* Display the post's author and timestamp linking to the post on Bsky*/}
        <Image src={currentPost.post.author?.avatar} alt={`${currentPost.post?.author?.handle}'s Bluesky avatar.`} className='author-avatar' width={500} height={300} />
        <span className='skeet-date'>Via <a className='skeet-author' href={`https://bsky.app/profile/${currentPost.post.author.handle}`} target="_blank" rel="noreferrer">@{currentPost.post.author.handle}</a> 
        <br/>Post: <a className='skeet-author' href={`https://bsky.app/profile/${currentPost.post.author.handle}/post/${currentPost.post.uri.split('/').pop()}`} target="_blank" rel="noreferrer"><u>{new Date(currentPost.post.record.createdAt).toLocaleString()}</u></a></span>
      </div>
    <div className='skeet-text'>
      {/*Check to see if it's a reply to another skeet, and if so, display who the reply is to. Debating on whether or not to link to Bsky profile.*/}
      {currentPost.reply ? (
        <div className='skeet-metatext skeet-reply-status'>Replying to @{currentPost.reply.parent.author.handle}...</div>
      ) : null}
      
      {/*Skeet text*/}
      <div style={{ whiteSpace: 'pre-line' }}>
        {renderTextContent(currentPost.post.record.text).map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </div>        
      {/* Displays a content warning if it's flagged for anything, otherwise it displays skeet images images */}
      {hasContentWarning ? (
    <div className='skeet-cw'>
      <p>CONTENT WARNING: MY GOODNESS! It would appear the dude is either being horny on main, or reskeeted something that's just otherwise too hot for the website.
        This particular content was flagged for the following: {(currentPost.post?.labels || currentPost.post?.record?.labels || []).map((label, index) => (
          <span key={index} className='skeet-label'>{label.val} </span>
        ))}</p>
      <p>So ReverendCrush.com fans, if you want to see the good stuff, or at the very least think you can handle it, you'll need to visit <a href={`https://bsky.app/profile/${currentPost.post.author.handle}/post/${currentPost.post.uri.split('/').pop()}`} target="_blank" rel="noreferrer">the actual post on Bsky.</a> While you're there, you might as well follow Rev, drop a like and comment, then reskeet whatever deviant imagery it is that we refuse to show you here.
      </p>
    </div>
) : (
  <div className='skeet-media-group'>
  {currentPost.post.embed?.$type === 'app.bsky.embed.images#view' ? (
    (currentPost.post.embed?.images || []).map((image, imgIndex) => (
      <div key={`post-img-${imgIndex}`}>
        <Image src={image.fullsize} alt={image.alt || "No ALT Text provided for this image."} loading="lazy" className='skeet-img-file' width={500} height={300} />
        <br/><p className='skeet-metatext'>{['//ALT TEXT: ']}{image.alt || "<ALERT: NO ALT TEXT PROVIDED!>"}</p>
      </div>
    ))
  ) : currentPost.post.embed?.$type === 'app.bsky.embed.recordWithMedia#view' ? (
    <>
      {currentPost.post.embed.media?.$type === 'app.bsky.embed.images#view' &&
        (currentPost.post.embed.media?.images || []).map((image, imgIndex) => (
          <div key={`post-img-${imgIndex}`}>
            <Image src={image.fullsize} alt={image.alt || "Default ALT text is missing"} loading="lazy" className='skeet-img-file' width={500} height={300} />
            <br/><p className='skeet-metatext'>{['//ALT TEXT: ']}{image.alt || "<ALERT: NO ALT TEXT PROVIDED!>"}</p>
          </div>
        ))
      }
      {currentPost.post.embed.media?.$type === 'app.bsky.embed.video#view' &&
        renderVideoEmbed(currentPost.post.embed.media)
      }
      {/* Handle quoted post video */}
      {currentPost.post.embed.record?.record?.embed?.$type === 'app.bsky.embed.video#view' &&
        renderVideoEmbed(currentPost.post.embed.record.record.embed)
      }
    </>
  ) : currentPost.post.embed?.$type.startsWith('app.bsky.embed.video') ? (
    renderVideoEmbed(currentPost.post.embed)
  ) : null}
</div>
)}
     
{/* Display YouTube embeds */} 
    {isYoutubeUri && youtubeVideoId && (
      <div>
        <div className='skeet-youtube'>
          <YouTube videoId={youtubeVideoId} />
        </div>
        <div className='web-deets'>
          <h3>{currentPost.post?.embed?.external?.title || currentPost.post?.embed?.media?.external?.title}</h3>
          <p className='skeet-metatext'>{currentPost.post?.embed?.external?.description || currentPost.post?.embed?.media?.external?.description}</p>
        </div>
      </div>
    )}
      
      
  {/*Display Website/Web Media cards*/}
  {
    (currentPost.post.embed?.external?.uri || currentPost.post.embed?.media?.external?.uri) && 
    !(currentPost.post.embed?.external?.uri.includes('youtube.com') || currentPost.post.embed?.external?.uri.includes('youtu.be') ||
    currentPost.post.embed?.media?.external?.uri.includes('youtube.com') || currentPost.post.embed?.media?.external?.uri.includes('youtu.be') ) && (
      <div className='skeet-web-media'>
        <a href={currentPost.post.embed?.external?.uri || currentPost.post.embed?.media?.external?.uri}><Image className='webcard-img' src={currentPost.post?.embed?.external?.thumb || currentPost.post.embed?.media?.external?.thumb} alt={currentPost.post?.embed?.external?.title || currentPost.post.embed?.media?.external?.title || 'Alt Text not available for some reason...'} loading="lazy" width={500} height={300} /></a>
        <div className='web-deets'>
          <h3>{currentPost.post.embed?.external?.title || currentPost.post.embed?.media?.external?.title}</h3>
          <p className='skeet-metatext'>{currentPost.post.embed?.external?.description || currentPost.post.embed?.media?.external?.description}</p>
        </div>
      </div>
    )
  }
      
  {/* Display Quote-Reskeets with user avatar and name */}
  {currentPost.post?.embed?.record && (
  <div className="quote-reskeet-box">
  <div className="skeet-header">
  <Image src={currentPost.post.embed.record.author?.avatar || currentPost.post.embed.record.record?.author?.avatar}
        alt={`${currentPost.post.embed.record.author?.name || currentPost.post.embed.record.record?.author?.name}'s Bluesky avatar!` || 'PFP of an nameless author, apparently...'} 
        className='author-avatar' width={500} height={300} />
    <span className='skeet-quote-author'>Now Reskeeting...<br/> 
    <a href={`https://bsky.app/profile/${currentPost.post.embed.record.author?.handle || currentPost.post.embed.record.record?.author?.handle}`} 
                    target="_blank" 
                    rel="noreferrer">
                    @{currentPost.post.embed.record.author?.handle || currentPost.post.embed.record.record?.author?.handle}
          </a>
    </span>
    </div>
    <div className="skeet-text">
      {renderTextContent(currentPost.post.embed.record.value?.text || currentPost.post.embed.record.record?.value?.text).map((segment, index) => (
        <React.Fragment key={index}>{segment}</React.Fragment>
      ))}
    </div>

      {/* Display images from the quoted skeet, provided it passes a Content Warning check */}
      {quoteHasContentWarning  ? (
    <div className='skeet-cw'>
      <p>CONTENT WARNING: JEEPERS, MR. WILSON! It would appear good ol' ReverendCrush (or whoever he reskeeted is quoting) wants you ALL to see something that, well, we're just not going to show here.
        Specifically, the content being quoted has been flagged for the following: {(currentPost?.post?.embed?.record?.labels || currentPost?.post?.embed?.record?.record?.labels || []).map((label, index) => (
          <span key={index} className='skeet-label'>{label.val} </span>
        ))}</p>
      <p>If you little achievers want to see ALL the goods (or horror; this is someone ReverendCrush is quoting after all, so it's not impossible), you'll need to visit <a href={`https://bsky.app/profile/${currentPost.post.author.handle}/post/${currentPost.post.uri.split('/').pop()}`} target="_blank" rel="noreferrer">the post on Bsky</a>, and while you're at it, be sure to follow Rev, drop a like and comment, and reskeet this explosion of sin if that's your thing because we won't show it.
      </p>
    </div>
) : (
  <div className='skeet-image-group'>
    {(currentPost.post.embed?.record?.embeds || currentPost.post.embed?.record?.record?.embeds)?.map((embed, embedIndex) => {
     if (embed.$type === 'app.bsky.embed.images#view' || embed.$type === 'app.bsky.embed.recordWithMedia#view') {
      const images = embed.$type === 'app.bsky.embed.images#view' ? embed.images : embed.media?.images;
      return images?.map((image, imgIndex) => (
        <div key={`quote-${embedIndex}-img-${imgIndex}`} className='skeet-image-group'>
          <Image src={image.fullsize} alt={image.alt || "No Alt Text Provided from Quote Skeet."} loading="lazy" className='skeet-img-file' width={500} height={300} />
          <br/><p className='skeet-metatext'>{['//ALT TEXT:']} {image.alt || "<ALERT: NO ALT TEXT PROVIDED!>"}</p>
        </div>
      ));
    } else if (embed.$type === 'app.bsky.embed.video#view') {
      return renderVideoEmbed(embed);
    }
      return null;
    })}
    </div>)}

        {/* Display YouTube video from the quoted post */}
        {
          (currentPost.embed?.record?.value?.embed?.external?.uri || currentPost.post.embed?.record?.embeds?.[0]?.external?.uri || currentPost.post?.embed?.media?.external?.uri || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.uri || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.uri) &&
          (currentPost.embed?.record?.value?.embed?.external?.uri.includes('youtube.com') || currentPost.embed?.record?.value?.embed?.external?.uri.includes('youtu.be') ||
          currentPost.post?.embed?.record?.embeds?.[0]?.external?.uri.includes('youtube.com') || currentPost.post?.embed?.record?.embeds?.[0]?.external?.uri.includes('youtu.be') ||
          currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.uri.includes('youtube.com') || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.uri.includes('youtu.be') ||
          currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.uri.includes('youtube.com') || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.uri.includes('youtu.be') ) && (
          <div>
            <div className='skeet-youtube'>
              <YouTube videoId={getPostYoutubeId(currentPost.embed?.record?.value?.embed?.external?.uri || currentPost.post?.embed?.record?.embeds?.[0]?.external?.uri || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.uri || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.uri)} />
            </div>
            <div className='web-deets'>
              <h3>{(currentPost.embed?.record?.value?.embed?.external?.title || currentPost.post?.embed?.record?.embeds?.[0]?.external?.title || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.title || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.title)}</h3>
              <p className='skeet-metatext'>{(currentPost.embed?.record?.value?.embed?.external?.description || currentPost.post?.embed?.record?.embeds?.[0]?.external?.description || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.description || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.description)}</p>
            </div>
          </div>
          )
        }

        {/* Display quoted post's non-YT web card */}
        {
          (currentPost.embed?.record?.value?.embed?.external?.uri || currentPost.post.embed?.record?.embeds?.[0]?.external?.uri || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.uri || currentPost.post?.embed?.record?.record?.embeds[0]?.external?.uri) &&
          !(currentPost.embed?.record?.value?.embed?.external?.uri.includes('youtube.com') || currentPost.embed?.record?.value?.embed?.external?.uri.includes('youtu.be') ||
          currentPost.post?.embed?.record?.embeds?.[0]?.external?.uri.includes('youtube.com') || currentPost.post?.embed?.record?.embeds?.[0]?.external?.uri.includes('youtu.be') ||
          currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.uri.includes('youtube.com') || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.uri.includes('youtu.be') ||
          currentPost.post?.embed?.record?.record?.embeds[0]?.external?.uri.includes('youtube.com') || currentPost.post?.embed?.record?.record?.embeds[0]?.external?.uri.includes('youtu.be') ) && (
            <div>
              <div className='skeet-web-media'>
                <a href={(currentPost.embed?.record?.value?.embed?.external?.uri || currentPost.post?.embed?.record?.embeds?.[0]?.external?.uri || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.uri || currentPost.post?.embed?.record?.record?.embeds[0]?.external?.uri)}><Image className='webcard-img' src={(currentPost.embed?.record?.value?.embed?.external?.thumb || currentPost.post?.embed?.record?.embeds?.[0]?.external?.thumb || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.thumb || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.thumb || currentPost.post?.embed?.record?.record?.embeds[0]?.external?.thumb || {noMediaImg})} alt={(currentPost.embed?.record?.value?.embed?.external?.title || currentPost.post?.embed?.record?.embeds?.[0]?.external?.title || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.title || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.title) || currentPost.post?.embed?.record?.record?.embeds[0]?.external?.title || 'Title not available. WEIRD...'} /></a>
              </div>
              <div className='web-deets'>
                <h3>{(currentPost.embed?.record?.value?.embed?.external?.title || currentPost.post?.embed?.record?.embeds?.[0]?.external?.title || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.title || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.title || currentPost.post?.embed?.record?.record?.embeds[0]?.external?.title)}</h3>
                <p className='skeet-metatext'>{(currentPost.embed?.record?.value?.embed?.external?.description || currentPost.post?.embed?.record?.embeds?.[0]?.external?.description || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.description || currentPost.post?.embed?.record?.record?.embeds?.[0]?.media?.external?.description || currentPost.post?.embed?.record?.record?.embeds[0]?.external?.description)}</p>
            </div>
          </div>
          )
        }
      </div>
    )}

<div className='skeet-banger-score'>
  <p>BANGER SCORE: <br/><span className='glow'>{score}</span></p>
  {ratioPenalty && <p className='skeet-metatext'>WARNING: RATIO PENALTY!!</p>}
  <p className='banger-score-text'>{flavorText}</p>
  <div className='flex-center'><button className='bsky-lb-button' onClick={toggleLeaderboard}>VIEW LEADERBOARD</button></div>
</div>
    </div>
    <div className="pagination-controls">
    <button className='bsky-pag-button' onClick={handleNext} disabled={currentPostIndex >= posts.length - 1}>← PRV.</button>
      <button className='bsky-pag-button' onClick={handlePrevious} disabled={currentPostIndex === 0}>NXT. →</button>  
    </div>
    <div><p className='skeet-text'>FOLLOW <a href='https://bsky.app/profile/reverendcrush.com' target="_blank" rel="noreferrer">@REVERENDCRUSH.COM</a> ON BLUESKY SOCIAL!!</p></div>
  </section>
);
};

export default BlueskySocial