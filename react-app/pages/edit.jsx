import { withRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import fetch from 'isomorphic-unfetch';

const Edit = ({ router }) => {
  const [hobbit, setHobbit] = useState({});
  const nameRef = useRef();
  const bioRef = useRef();

  const updateHobbit = async () => {
    try {
      const data = await fetch(`http://localhost:4000/api/users/${hobbit.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          bio: bioRef.current.value
        })
      });
      console.log(data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.object) {
      setHobbit(JSON.parse(router.query.object));
    }
  }, [setHobbit]);
  return (
    <div>
      <h1>Edit Hobbit</h1>
      <p>Name:</p>
      <input ref={nameRef} type="text" defaultValue={hobbit.name} />
      <p>Bio:</p>
      <input ref={bioRef} type="text" defaultValue={hobbit.bio} />
      <p>
        <button onClick={updateHobbit}>Update</button>{' '}
        <button onClick={() => router.push('/')}>Cancel</button>
      </p>
    </div>
  );
};

export default withRouter(Edit);
