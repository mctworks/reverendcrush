import React, { useEffect, useState } from 'react';
import { BskyAgent } from '@atproto/api';
import YouTube from 'react-youtube';

const BlueskySocial = () => {
  const HANDLE = 'reverendcrush.com';
  const APP_PASSWORD = 'no6e-unlo-oob2-exqz';
  const SERVICE_URL = 'https://bsky.social';

  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [error, setError] = useState(null);

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
        limit: 100,
      });

      if (Array.isArray(data.feed)) {
        setPosts(data.feed);
      } else {
        console.error('Invalid feed data format:', data.feed);
        setError('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  }

  const handlePrevious = () => {
    setCurrentPostIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentPostIndex(prevIndex => Math.min(prevIndex + 1, posts.length - 1));
  };

  if (error) {
    return <div className='bsky-home skeet-text'>BlueSky Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className='bsky-home skeet-text'>Loading skeets...</div>;
  }

  const currentPost = posts[currentPostIndex];

  console.log('Current post:', currentPost); // Debugging log to inspect the currentPost object

  if (!currentPost || !currentPost.post || !currentPost.post.record) {
    console.error("Current post is undefined or missing the record property:", currentPost);
    return <div className='bsky-home skeet-text'>Error loading skeet...</div>;
  }

  const parseText = (text) => {
    console.log('parseText called with:', text); // Debugging log
    if (!text) return ''; // Return an empty string if text is undefined
    const usernameRegex = /@(\w+(?:\.\w+)*)(?=[^\w.@]|$)/g;

    return text.split(usernameRegex).map((part, index) => {
      if (index % 2 === 0) {
        return part; // Normal text
      } else {
        return <a href={`https://bsky.app/profile/${part}`} target="_blank" rel="noreferrer">@{part}</a>; // Link to user profile
      }
    });
  };

  const getPostYoutubeId = (url) => {
    let id = '';
    if (url.includes('youtube.com')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      id = urlParams.get('v');
    } else if (url.includes('youtu.be')) {
      id = url.split('youtu.be/')[1];
      id = id.split('?')[0];
    }
    return id;
  };

  return (
    <section className='bsky-home'>
      <div className='bsky-latest'><h2>Latest from the Bsky</h2>
      </div>
      <div className='skeet-header'>
          {/* Display the post's author and timestamp linking to the post on Bsky*/}
          <img src={currentPost.post.author?.avatar} alt={`HEY, CHECK IT OUT, IT'S ${currentPost.post?.author?.name}'s PFP! WHALES AREN'T REAL!`} className='author-avatar' />
          <span className='skeet-date'>Via <a className='skeet-author' href={`https://bsky.app/profile/${currentPost.post.author.handle}`} target="_blank" rel="noreferrer">@{currentPost.post.author.handle}</a> 
          <br/>Post: <a className='skeet-author' href={`https://bsky.app/post/${currentPost.post.uri}`} target="_blank" rel="noreferrer"><u>{new Date(currentPost.post.record.createdAt).toLocaleString()}</u></a></span>
        </div>
      <div className='skeet-text'>
        {/*Check to see if it's a reply to another skeet, and if so, display who the reply is to. Debating on whether or not to link to Bsky profile.*/}
        {currentPost.reply ? (
          <div className='skeet-metatext skeet-reply-status'>Replying to @{currentPost.reply.parent.author.handle}...</div>
        ) : null}
        
        {/*Skeet text*/}
        <p style={{ whiteSpace: 'pre-line' }}>{parseText(currentPost?.post?.record?.text ?? 'WARNING: (NULL TEXT). No yelling @ReverendCrush, please, this is probably a reskeet. But no yelling at them either, alright? Be cool, man. Be cool.')}</p>
        
        {/* Display images */}
        <div className='skeet-image-group'>
        {Array.isArray(currentPost.post.embed?.images || currentPost.post.embed?.media?.images) && (currentPost.post.embed?.images || currentPost.post.embed?.media?.images).map((image, index) => (
          <div key={index}>
              <img key={index} src={image.fullsize} alt={image.alt} loading="lazy" className='skeet-img-file' />
              <br/><p className='skeet-metatext'>//ALT TEXT: {image.alt || 'WARNING: (NULL TEXT). No yelling @ReverendCrush, please, this is probably a reskeet. And no yelling at whoever I reskeeted either, alright? Be cool, man. Be cool.'}</p>
          </div>
        ))}
        </div>

        
        {/* Display YouTube embeds */}
        {
          currentPost.post.embed?.external?.uri && 
          (currentPost.post.embed.external.uri.includes('youtube.com') || currentPost.post.embed.external.uri.includes('youtu.be')) && (
            <div className='skeet-youtube'>
              <YouTube videoId={getPostYoutubeId(currentPost.post.embed.external.uri)} />
            </div>
          )
        }
        {console.log(currentPost.post.embed)}
        
        {/* Display Quote-Reskeets with user avatar and name */}
        {currentPost.post?.embed?.record && (
        <div className="quote-reskeet-box">
        <div className="skeet-header">
        <img src={currentPost.post.embed.record.author?.avatar || currentPost.post.embed.record.record?.author?.avatar} 
              alt={`HEY LOOK IT'S ${currentPost.post.embed.record.author?.name || currentPost.post.embed.record.record?.author?.name}'s STUPID PFP. MySPACE WAS A PSyOP!`} 
              className='author-avatar' />
          <span className='skeet-quote-author'>Now Reskeeting...<br/> 
          <a href={`https://bsky.app/profile/${currentPost.post.embed.record.author?.handle || currentPost.post.embed.record.record?.author?.handle}`} 
                          target="_blank" 
                          rel="noreferrer">
                          @{currentPost.post.embed.record.author?.handle || currentPost.post.embed.record.record?.author?.handle}
                </a>
          </span>
          </div>
          <div className="skeet-text">
            {parseText(currentPost.post.embed.record.value?.text || currentPost.post.embed.record.record?.value?.text)}
          </div>

          {/* Display images from the quoted skeet */}
          <div className='skeet-image-group'>
  {(currentPost.post.embed?.record?.embeds || currentPost.post.embed?.record?.record?.embeds)?.map((embed, embedIndex) => {
    if (embed.$type === "app.bsky.embed.images" || embed.$type === "app.bsky.embed.record" || embed.$type === "app.bsky.embed.images#view") {
      return embed.images?.map((image, imgIndex) => (
        <div key={`embed-${embedIndex}-img-${imgIndex}`}>
          <img src={image.fullsize} alt={image.alt || "ERROR! NULL ALT TEXT! OH NOES WHATEVER WILL WE DOOS!? Look, don't yell at anyone involved just because they forgot some alt text. That includes me, your buddy @ReverendCrush.com. And the person posting this image. But more importantly ME. I don't need it, man."} loading="lazy" className='skeet-img-file' />
          <br/><p className='skeet-metatext'>//ALT TEXT: {image.alt || "ERROR! NULL ALT TEXT! OH NOES WHATEVER WILL WE DOOS!? Look, don't yell at anyone involved just because they forgot some alt text. That includes me, your buddy @ReverendCrush.com. And the person posting this image. But more importantly ME. I don't need it, man."}</p>
        </div>
      ));
    }
    return null;
  })}
</div>

<div className='skeet-image-group'>
        {Array.isArray(currentPost.post.embed?.record?.record?.embeds?.[0]?.media?.images) && currentPost.post.embed?.record?.record?.embeds?.[0]?.media?.images.map((image, index) => (
          <div key={index}>
              <img key={index} src={image.fullsize} alt={image.alt} loading="lazy" className='skeet-img-file' />
              <br/><p className='skeet-metatext'>//ALT TEXT: {image.alt || 'WARNING: (NULL TEXT). No yelling at @ReverendCrush, please, this is probably a reskeet. And no yelling at whoever I reskeeted either, alright? Be cool, man. Be cool.'}</p>
          </div>
        ))}
</div>
          
          {/* Display YouTube video from the quoted post */}
          {
            (currentPost.embed?.record?.value?.embed?.external?.uri || currentPost.post.embed?.record?.embeds?.[0]?.external?.uri || currentPost.post.embed?.record?.embeds?.[0]?.media?.external?.uri) &&
            (currentPost.embed?.record?.value?.embed?.external?.uri.includes('youtube.com') || currentPost.embed?.record?.value?.embed?.external?.uri.includes('youtu.be') ||
            currentPost.post?.embed?.record?.embeds?.[0]?.external?.uri.includes('youtube.com') || currentPost.post?.embed?.record?.embeds?.[0]?.external?.uri.includes('youtu.be') ||
            currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.uri.includes('youtube.com') || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.uri.includes('youtu.be')) && (
              <div className='skeet-youtube'>
                <YouTube videoId={getPostYoutubeId(currentPost.embed?.record?.value?.embed?.external?.uri || currentPost.post?.embed?.record?.embeds?.[0]?.external?.uri || currentPost.post?.embed?.record?.embeds?.[0]?.media?.external?.uri)} />
              </div>
            )
          }
        </div>
      )}
      </div>
      <div className="pagination-controls">
      <button onClick={handleNext} disabled={currentPostIndex >= posts.length - 1}>PREV.</button>
        <button onClick={handlePrevious} disabled={currentPostIndex === 0}>FWD.</button>
        
      </div>
    </section>
  );
};

export default BlueskySocial


