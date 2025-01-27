import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/Bio.css';
import '../styles/Home.css';
import '../styles/Projects.css';
import '../styles/Footer.css';
import '../styles/Header.css';
import '../styles/Main.css';
import '../styles/Socials.css';
import '../fonts/fonts.css'
import '../styles/Blog.scss';
import 'bluesky-comments/bluesky-comments.css'
import Main from '../components/MainComponent';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
            </Head>
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-272T5Q0FRB"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-272T5Q0FRB');
                    `,
                }}
            />
            
            <Main>
                <Component {...pageProps} />
            </Main>
        </>
    );
} 