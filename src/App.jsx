import "./App.css";
import React, { useState, useEffect } from "react";
import { getAllJokes, postJoke } from "./services/jokeService.jsx";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [newJoke, setNewJoke] = useState(""); //State for storing user (empty right now) newJoke input

  // const fetchJokes = async () => {
  //   try {
  //     const jokes = await getAllJokes(); // Call the API function
  //     console.log("Fetched jokes:", jokes);
  //     setAllJokes(jokes); // Set all jokes to state
  //   } catch (error) {
  //     console.error("Error fetching jokes:", error); // Handle errors
  //   }
  // };

  const fetchJokes = async () => {
    const jokes = await getAllJokes();
    setAllJokes(jokes);
  };

  useEffect(() => {
    fetchJokes();
  }, []); //Empty dependency array ensures this runs only once after initial render

  //When you call setNewJoke with event.target.value, you’re updating the newJoke state with whatever the user has currently typed into the input field(value).
  function handleInputChange(event) {
    setNewJoke(event.target.value);
  }

  // useEffect to log newJoke whenever it changes ??? do I need this?
  // useEffect(() => {
  //   console.log("New joke input changed:", newJoke);
  // }, [newJoke]); // only runs when newJoke changes

  useEffect(() => {
    const told = allJokes.filter((joke) => joke.told === true);
    const untold = allJokes.filter((joke) => joke.told === false);
    setToldJokes(told);
    setUntoldJokes(untold);
  }, [allJokes]); // This runs every time allJokes changes

  const handlePostJoke = async () => {
    const result = await postJoke(newJoke);
    if (result) {
      setUntoldJokes((previousList) => [...previousList, result]); //creating a new array that includes all the jokes from the previousList plus the new joke result at the end. This new array is then set as the new state for untoldJokes ... using the spread operator to pull apart the untoldJokes array then create a new one
      setToldJokes((previousList) => [...previousList, result]);
    }
    setNewJoke("");
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1>"Chuckle Checklist"</h1>
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
      </div>

      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJoke} // Bind the input value to the state
          onChange={handleInputChange} //Calls this function whenever the input changes // Update state on change
        />
      </div>

      <button
        className="joke-input-submit"
        type="button"
        onClick={handlePostJoke}
        // onClick={(event) => {
        //   //so that it happens on event not on page render {(event) =>
        //   postJoke(newJoke);
        //   setNewJoke(""); // added to clear input field
        // }}
      >
        Post New Joke
      </button>

      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>Told Jokes: {toldJokes.length}</h2>
          <ul>
            {toldJokes.map((joke) => (
              <li key={joke.id}>{joke.text}</li>
            ))}
          </ul>
        </div>
        <div className="joke-list-container">
          <h2>Untold Jokes: {untoldJokes.length}</h2>
          <ul>
            {untoldJokes.map((joke) => (
              <li key={joke.id}>{joke.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

//an object not a function--{postJoke(newJoke)}(worked? with error)--(setNewJoke)--(newJoke.text)
//target is not defined -- {postJoke(target.value)}
//callback function- child component needs to update its parent’s state (to clear input)
//useEffect is a special helper that watches what happens in your app
//lets you run some code when something changes
//{function(what we want to happen)}, [dependency array(when we want it to happen)]
