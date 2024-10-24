import "./App.css";
import React, { useState, useEffect } from "react";
import { postJoke } from "./services/jokeService.jsx";

export const App = () => {
  //const [allJokes, setAllJokes] = useState([]); //State for storing jokes

  //??? was I supposed to store jokes using the useState([]) on line 6???

  const [newJoke, setNewJoke] = useState(""); //State for storing user (empty right now) newJoke input

  //When you call setNewJoke with event.target.value, you’re updating the newJoke state with whatever the user has currently typed into the input field.
  const handleInputChange = (event) => {
    setNewJoke(event.target.value); // Update state with the current input value
  };

  // useEffect to log newJoke whenever it changes
  //useEffect is a special helper that watches what happens in your app
  //lets you run some code when something changes
  //{function(what we want to happen)}, [dependency array(when we want it to happen)]
  useEffect(() => {
    console.log("New joke input changed:", newJoke);
  }, [newJoke]); // only runs when newJoke changes

  return (
    <>
      <div>
        <h1>"Hello World!"</h1>
      </div>
      <div>
        <input
          className=""
          type="text"
          placeholder="New One Liner"
          value={newJoke} // Bind the input value to the state
          onChange={handleInputChange} //Calls this function whenever the input changes // Update state on change
        />
      </div>
      <button
        type="button"
        onClick={(event) => {
          postJoke(newJoke);
          setNewJoke(""); // added to clear input field
        }}
      >
        Post New Joke
      </button>
    </>
    //so that it happens on event not on page render {(event) =>
    //an object not a function--{postJoke(newJoke)}(worked? with error)--(setNewJoke)--(newJoke.text)
    //target is not defined -- {postJoke(target.value)}
  );
};

//callback function-  child component needs to update its parent’s state (to clear input)
