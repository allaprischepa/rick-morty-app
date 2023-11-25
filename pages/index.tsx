const HomePage = () => null;

export function getServerSideProps({ res }) {
  res.writeHead(301, { Location: '/page/1' });
  res.end();

  return { props: {} };
}

export default HomePage;
