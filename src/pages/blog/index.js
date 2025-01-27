import React, { useEffect } from 'react';
import { getSortedPostsData } from '../../../lib/posts';
import Link from 'next/link';
import ErrorBoundary from '../../components/ErrorBoundary';
import Image from 'next/image';

export async function getStaticProps() {
  try {
    const allPostsData = getSortedPostsData();
    console.log('All posts data:', allPostsData);
    return {
      props: {
        allPostsData
      }
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        allPostsData: []
      }
    };
  }
}

export default function Blog({ allPostsData }) {
  useEffect(() => {
    console.log('Blog component mounted');
    document.body.classList.add('blog-page');
    return () => {
      document.body.classList.remove('blog-page');
    };
  }, []);

  console.log('Rendering Blog component with data:', allPostsData);

  return (
    <ErrorBoundary fallback={<div>Something went wrong loading the blog.</div>}>
      <div>
        <h1>The Dude's Soapbox</h1>
        {allPostsData.length === 0 ? (
          <p>Either Rev deleted all the blog posts or there was an accident. Please check back later!</p>
        ) : (
          <div>
            {allPostsData.map(({ id, date, title, thumbnail, summary, author }) => (
              <div key={id} className="post">
                <Image
                  src={thumbnail}
                  alt={title}
                  className="thumbnail"
                  width={500}
                  height={300}
                />
                <div className="content">
                  <Link href={`/blog/${id}`}>
                    <h2>{title}</h2>
                  </Link>
                  <p>{summary}</p>
                  <small>{date}</small>
                </div>
              </div>
            ))}
            <div className="blog_placeholder">
              <Link href='/'>BACK TO MAIN</Link>
              <Image src='/img/long_splash.png' 
                className='splash_plchldr' 
                alt='' 
                width={50} 
                height={1000} />
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
} 