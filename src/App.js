import * as React from 'react';
import { Helmet } from 'react-helmet';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App" id="outer-container">
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Home of Dr. Reverend Crush, Dudeist Gamer and Retrogaming Enthusiast." />
        <meta name="keywords" content="reverendcrush, reverend crush, ichibancrush, ichiban crush, retrogaming, gaming, bluesky, bluesky social, bluesky social media" />
        <meta property="og:type" content="website" /> 
        <meta property="og:title" content="ReverendCrush.com" /> 
        <meta property="og:description" content="Home of Dr. Reverend Crush, Dudeist Gamer and Retrogaming Enthusiast." /> 
        <meta property="og:image" content="https://reverendcrush.com/img/og_img.png" /> 
        <meta property="og:url" content="https://reverendcrush.com" /> 
        <meta property="og:site_name" content="ReverendCrush.com" />
        <meta name="twitter:title" content="ReverendCrush.com" /> 
        <meta name="twitter:description" content="Home of Reverend Crush, Dudeist Gamer/Retrogaming Enthusiast. More entertaining than reading Elon's horrible posts." /> 
        <meta name="twitter:image" content="https://reverendcrush.com/img/x_img.png"/> 
        <meta name="twitter:site" content="@reverendcrush" /> 
        <meta name="twitter:creator" content="@reverendcrush" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
