import Header from '../components/Header';
import HobbitsList from '../components/HobbitsList';
import fetch from 'isomorphic-unfetch';

const Index = ({ hobbits }) => {
  return (
    <>
      <Header />
      <HobbitsList hobbits={hobbits} />
    </>
  );
};

Index.getInitialProps = async ({ req }) => {
  const res = await fetch('http://localhost:4000/api/users');
  const json = await res.json();
  return { hobbits: json };
};

export default Index;
