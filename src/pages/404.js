import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
      const id = path.split('/blog/')[1];
      router.replace(`/blog/${id}`);
    } else {
      router.replace(path);
    }
  }, [router]);

  return <div>Loading...</div>;
}
