import React, { useEffect } from 'react';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { BlueskyComments } from 'bluesky-comments';
import ErrorBoundary from '../../components/ErrorBoundary';
import Link from 'next/link';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}

export default function Post({ postData }) {
  useEffect(() => {
    document.body.classList.add('blog-page');
    return () => {
      document.body.classList.remove('blog-page');
    };
  }, []);

  if (!postData) {
    return <div>Post not found</div>;
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong loading the blog post.</div>}>
      <Head>
        <title>ReverendCrush.com - The Dude's Soapbox - {postData.title}</title>
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.summary || 'NO DESCRIPTION.'} />
        <meta property="og:image" content={postData.thumbnail} />
        <meta property="og:url" content={`https://reverendcrush.com/blog/${postData.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.summary || 'NO DESCRIPTION.'} />
        <meta name="twitter:image" content={postData.thumbnail} />
      </Head>
      <div className="blog-post">
        <h1>{postData.title}</h1>
        <small>Written by {postData.author}</small>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{postData.content}</ReactMarkdown>
        <div>
          <BlueskyComments
            author="reverendcrush.com"
            uri=""
            onEmpty={() => {
              console.log('No comments found, displaying this console message.');
            }}
            onCommentsFetched={() => {
              console.log('Comments fetched successfully.');
            }}
            commentFilters={[]}
          />
        </div>
        <Link href='/blog'>RETURN TO THE DUDE'S SOAPBOX</Link><br />
        <Link href='/'>BACK TO MAIN</Link>
      </div>
    </ErrorBoundary>
  );
}