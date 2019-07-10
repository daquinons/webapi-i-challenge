import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HobbitsList from '../components/HobbitsList';
import fetch from 'isomorphic-unfetch';

const Index = () => {
  const [hobbits, setHobbits] = useState([]);
  useEffect( () => {
    const fetchData = async () => {
      await getHobbits();
    }
    fetchData();
  }, []);

  const update = async () => {
    await getHobbits();
  };

  const getHobbits = async () => {
    const res = await fetch('http://localhost:4000/api/users');
    const json = await res.json();
    setHobbits(json);
  };

  return (
    <>
      <Header />
      <HobbitsList hobbits={hobbits} update={update} />
    </>
  );
};

export default Index;
