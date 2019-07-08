const HobbitsList = ({ hobbits }) => {
  return hobbits
    ? hobbits.map((hobbit, index) => {
        return (
          <div className="hobbit" key={index}>
            <ul>{hobbit.name}</ul>
            <ul>{hobbit.bio}</ul>
            <br />
          </div>
        );
      })
    : null;
};

export default HobbitsList;
