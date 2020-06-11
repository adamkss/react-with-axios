import React, { useCallback, useState } from "react";
import "./DogManager.css";

export default ({ dogs = [], onCreateNewDog }) => {
  const [newDogName, setNewDogName] = useState("");

  const onNewDogNameChange = useCallback((event) => {
    setNewDogName(event.target.value);
  }, []);

  const onAddDoggie = useCallback(
    (event) => {
      event.preventDefault();
      onCreateNewDog(newDogName);
      setNewDogName("");
    },
    [onCreateNewDog, newDogName]
  );

  return (
    <div className="container">
      <section className="dog-create-form">
        <form>
          <input
            type="text"
            placeholder="Doggie name..."
            value={newDogName}
            onChange={onNewDogNameChange}
          />
          <button type="submit" onClick={onAddDoggie}>
            Create
          </button>
        </form>
      </section>
      <div className="divider" />
      <section className="dog-list-section">
        <p>My doggies:</p>
        <ul>
          {dogs.map((dog) => (
            <li key={dog.name}>{dog.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};
