import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSVideoPlayer = ({ src, poster, aspectRatio }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }
  }, [src]);

  const ratio = aspectRatio && aspectRatio.width && aspectRatio.height
    ? `${aspectRatio.width} / ${aspectRatio.height}`
    : '16 / 9';

  return (
    <video
      ref={videoRef}
      controls
      poster={poster}
      style={{
        width: '100%',
        height: 'auto',
        aspectRatio: ratio,
      }}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default HLSVideoPlayer;