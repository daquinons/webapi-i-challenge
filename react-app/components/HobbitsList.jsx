import fetch from 'isomorphic-unfetch';

const HobbitsList = ({ hobbits, update }) => {
  const onDelete = async (event) => {
    const hobbitToDelete = hobbits[event.target.id];
    await deleteRequest(hobbitToDelete.id);
    await update();
  };

  const deleteRequest= async (id) => {
    const deletedHobbit = await fetch(`http://localhost:4000/api/users/${id}`, {
      method: 'DELETE'
    });
    return deletedHobbit;
  };
  return hobbits
    ? hobbits.map((hobbit, index) => {
        return (
          <div className="hobbit" key={index}>
            <ul>{hobbit.name} <button onClick={onDelete} id={index}>Delete</button></ul>
            <ul>{hobbit.bio}</ul>
            <br />
          </div>
        );
      })
    : null;
};

export default HobbitsList;
