import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

const useScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup the event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
};

export default function Main({ children }) {
  console.log("MainComponent is rendering");
  useScrollToTop(); // Call the custom hook

  return (
    <div id="outer-container">
      <Header />
      <main id="page-wrap">
        <div id='page-wrap' className="page-wrap">
          {children} {/* Page content renders here */}
          <Footer />
        </div>
      </main>
    </div>
  );
}

