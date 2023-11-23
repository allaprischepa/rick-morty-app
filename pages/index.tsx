import { useRouter } from 'next/router';
import { useEffect } from 'react';

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/page/1');
  });

  return null;
}

export function getServerSideProps({ res }) {
  res.writeHead(301, { Location: '/page/1' });
  res.end();

  return { props: {} };
}

export default HomePage;
