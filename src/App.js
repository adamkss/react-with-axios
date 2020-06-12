import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import axios from "axios";
import DogManager from "./DogManager";

const myDogServerBaseURL = "http://localhost:3000";

const App = () => {
  //This state will be populated with the Axios HTTP response
  const [dogs, setDogs] = useState([]);

  const loadDogs = useCallback(async () => {
    const response = await axios.get(`${myDogServerBaseURL}/dogs`);
    const dogs = response.data;
    setDogs(dogs);
  }, []);

  //The doggies are loaded initially
  useEffect(() => {
    loadDogs();
  }, [loadDogs]);

  const onCreateNewDog = useCallback(
    async (newDogName) => {
      try {
        await axios.post(`${myDogServerBaseURL}/dogs`, {
          name: newDogName,
        });
        loadDogs();
      } catch (error) {
        /**
         * If the response status code is 409 - Conflict, then we already have
         * a doggie with this name.
         **/
        if (error.response.status === 409) {
          alert("Doggie with same name exists!");
        } else {
          alert("Unknown error.");
        }
      }
    },
    [loadDogs]
  );

  return (
    <main className="u-centered-content u-full-vw u-full-vh">
      <DogManager dogs={dogs} onCreateNewDog={onCreateNewDog} />
    </main>
  );
};

export default App;
