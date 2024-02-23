import React, { useEffect, useState } from 'react';
import { BskyAgent } from '@atproto/api';
import YouTube from 'react-youtube';

const BlueskySocial = () => {
  const HANDLE = 'reverendcrush.com';
  const APP_PASSWORD = 'no6e-unlo-oob2-exqz';
  const SERVICE_URL = 'https://bsky.social';

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const agent = new BskyAgent({ service: SERVICE_URL });
        const { data: { did } } = await agent.resolveHandle({ handle: HANDLE });
        await agent.login({ identifier: did, password: APP_PASSWORD });
        const { data } = await agent.getAuthorFeed({
          actor: did,
          filter: 'posts_and_author_threads',
          limit: 1,
        });

        if (Array.isArray(data.feed)) {
          const postsData = data.feed.map(item => {
            const post = item.post;
            const { likeCount, replyCount, repostCount } = post;
            const bangerScore = likeCount * 200 + replyCount * 300 + repostCount * 1000;
            const images = post.embed?.media?.images || [];
            console.log(post)
            return {
              author: post.author,
              date: new Date(post.record.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'long', timeStyle: 'long' }),
              text: post.record.text,
              embed: post.embed,
              bangerScore: bangerScore,
              images: images
            };
          });
          setPosts(postsData);
        } else {
          console.error('Invalid feed data format:', data.feed);
          throw new Error('Invalid feed data format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Posts State Updated:', posts);
    posts.forEach((post, index) => {
      console.log(`Post [${index}]:`, post);
      if (post.embed && post.embed.record && post.embed.record.record) {
        console.log(`Quoted Post Data [${index}]:`, post.embed.record.record);
        if (post.embed.record.record.embed && post.embed.record.record.embed.images) {
          console.log(`Quoted Post Images [${index}]:`, post.embed.record.record.embed.images);
        }
      }
    });
  }, [posts]);

  if (error) {
    return <div className='bsky-home skeet-text'>BlueSky Error: {error}</div>;
  }

  return (
    <section className='bsky-home'>
      <h2>Latest Skeet On Bsky</h2>
      <ul className='latest-skeet'>
      {posts.map((post, index) => {
        // Post object rendering logic ...
        return (
          <li key={index}>
            <p className='skeet-date'>Posted by <a href={`https://bsky.app/profile/${post.author.handle}`} target="_blank" rel="noreferrer">@{post.author.handle}</a> on <u>{post.date}</u></p>
            <div className='skeet-text' style={{ whiteSpace: 'pre-line' }}>
              {parseText(post.text)}
              {post.embed && post.embed.media && post.embed.media.external && post.embed.media.external.uri.includes('youtu.be') && (
                <div className='youtube'>
                  <div className='skeet-youtube'>
                    <YouTube videoId={getPostYoutubeId(post.embed.media.external.uri)} />
                  </div>
                  <div className='youtube-deets'>
                    <h3>{post.embed.media.external.title}</h3>
                    <p className='skeet-metatext'><RenderTextWithLinks text={post.embed.media.external.description} /></p>
                  </div>
                </div>
              )}
            </div>
            {/* Now including logic to render quoted post text and images */}
            {post.embed && post.embed.record && post.embed.record.record && (
              <div className="quote-reskeet-box">
                <div className="reskeet-user">
                  <img
                    className="reskeet-pfp"
                    src={post.embed.record.record.author.avatar}
                    alt={`Avatar of ${post.embed.record.record.author.handle}`}
                  />
                  <div>
                    Reskeeting...
                    <br />
                    <a
                      className="reskeet-handle"
                      href={`https://bsky.app/profile/${post.embed.record.record.author.handle}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @{post.embed.record.record.author.handle}
                    </a>
                  </div>
                </div>
                
                {/* Render quoted post text */}
                <div className="quoted-post-text">
                  {post.embed.record.record.value.text}
                </div>
                
                {/* Render quoted post images, or at least it should */}
                {post.embed.record.record.value.embed && post.embed.record.record.value.embed.images && (
                  <div className="skeet-image-group">
                    {post.embed.record.record.value.embed.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        className="skeet-img-file"
                        src={image.image.ref['$link']} // STILL NOT WORKING
                        alt={image.alt || 'Quoted post image'}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            <div>
              <h4 className='skeet-banger-score'>Banger Score:<br/> <span className='glow'>{post.bangerScore}</span></h4>
            </div>
          </li>
        );
      })}
      </ul>
    </section>
  );
};

const constructImageUrl = (did, blobRef) => {
  return `https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${blobRef}@jpeg`;
};

const parseText = (text) => {
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
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})(?:\S+)?/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
};

function formatTextWithLinks(text) {
  if (text === undefined) return ''; // Add this line to handle undefined inputs
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // Replace URLs with a line break followed by the URL
  return text.replace(urlRegex, '<br />$1');
}

function RenderTextWithLinks({ text }) {
  // Ensure text is treated as a string, even if it's undefined
  const formattedText = formatTextWithLinks(text || '');
  // Split the formatted text by <br /> to get an array of strings
  const parts = formattedText.split('<br />');

  return (
    <div>
      {parts.map((part, index) => (
        // Render each part, and if it's not the first part, add a <br /> before it
        <React.Fragment key={index}>
          {index !== 0 && <br />}
          {part}
        </React.Fragment>
      ))}
    </div>
  );
}

export default BlueskySocial;
