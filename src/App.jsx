import "./App.css";
import React, { useState, useEffect } from "react";
import {
  deleteJoke,
  getAllJokes,
  postJoke,
  updateToldStatusApi,
} from "./services/jokeService.jsx";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [newJoke, setNewJoke] = useState("");

  const fetchJokes = async () => {
    const jokes = await getAllJokes();
    setAllJokes(jokes);
  };

  useEffect(() => {
    fetchJokes();
    updateJokeData();
  }, []); //Empty dependency array ensures this runs only once after initial render

  function handleInputChange(event) {
    setNewJoke(event.target.value);
  }

  useEffect(() => {
    const told = allJokes.filter((joke) => joke.told === true);
    const untold = allJokes.filter((joke) => joke.told === false);
    setToldJokes(told);
    setUntoldJokes(untold);
  }, [allJokes]); // This runs every time allJokes changes

  const handlePostJoke = async () => {
    const result = await postJoke(newJoke);
    // if (result) {
    //   setUntoldJokes((previousList) => [...previousList, result]);
    //   setToldJokes((previousList) => [...previousList, result]);
    // }
    setNewJoke("");
    updateJokeData();
  };

  const toggleToldStatus = async (id) => {
    const jokeToToggle = allJokes.find((joke) => joke.id === id);

    if (jokeToToggle) {
      await updateToldStatusApi({ ...jokeToToggle, told: !jokeToToggle.told }); // updates told status to the opposite of what it currently is
      updateJokeData(); //sends this updated joke to the server
    }
  };

  const updateJokeData = () => {
    getAllJokes().then((jokeArr) => {
      setAllJokes(jokeArr);
    });
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
      </div>

      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJoke}
          onChange={handleInputChange}
        />
      </div>

      <button
        className="joke-input-submit"
        type="button"
        onClick={handlePostJoke}
      >
        Post New Joke
      </button>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Told Jokes:
            <span className="told-count">{toldJokes.length}</span>
          </h2>
          <ul>
            {toldJokes.map((joke) => (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <div className="joke-list-action-delete">
                  <button
                    onClick={() => {
                      deleteJoke(joke.id), updateJokeData();
                    }}
                  >
                    Delete
                  </button>
                </div>
                <div className="joke-list-action-toggle">
                  <button
                    onClick={() => {
                      toggleToldStatus(joke.id);
                    }}
                  >
                    Untold
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="joke-list-container">
          <h2>
            Untold Jokes:
            <span className="untold-count">{untoldJokes.length}</span>
          </h2>
          <ul>
            {untoldJokes.map((joke) => (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <div className="joke-list-action-delete">
                  <button
                    onClick={() => {
                      deleteJoke(joke.id), updateJokeData();
                    }}
                  >
                    Delete
                  </button>
                </div>
                <div className="joke-list-action-toggle">
                  <button onClick={() => toggleToldStatus(joke.id)}>
                    Told
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
//changed to handlePostJoke
// onClick={(event) => {
//   //so that it happens on event not on page render {(event) =>
//   postJoke(newJoke);
//   setNewJoke(""); // added to clear input field
// }}

//creating a new array that includes all the jokes from the previousList plus the new joke result at the end. This new array is then set as the new state for untoldJokes ... using the spread operator to pull apart the untoldJokes array then create a new one

// useEffect to log newJoke whenever it changes ??? do I need this?
// useEffect(() => {
//   console.log("New joke input changed:", newJoke);
// }, [newJoke]); // only runs when newJoke changes

//When you call setNewJoke with event.target.value, you’re updating the newJoke state with whatever the user has currently typed into the input field(value).

//an object not a function--{postJoke(newJoke)}(worked? with error)--(setNewJoke)--(newJoke.text)
//target is not defined -- {postJoke(target.value)}
//callback function- child component needs to update its parent’s state (to clear input)
//useEffect is a special helper that watches what happens in your app
//lets you run some code when something changes
//{function(what we want to happen)}, [dependency array(when we want it to happen)]
