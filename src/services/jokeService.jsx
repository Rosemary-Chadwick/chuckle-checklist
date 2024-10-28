export const postJoke = (jokeText) => {
  const newJoke = {
    text: jokeText,
    told: false,
  };

  try {
    // post new joke in the database
    const response = fetch("http://localhost:8088/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJoke),
    });

    //throw means you’re saying, “Stop everything and let someone know there was a problem.” It will jump to the nearest catch block to handle the error.
    if (!response.ok) {
      throw new Error("Failed to post the joke");
    }
    const result = response.json();
    console.log("New joke posted:", result);
    return result;
  } catch (error) {
    console.error("Error posting joke:", error);
  }
};

export const getAllJokes = async () => {
  const response = await fetch("http://localhost:8088/jokes");
  const data = await response.json();
  return data;
};

export const updateToldStatusApi = async (editedJoke) => {
  try {
    const response = await fetch(
      `http://localhost:8088/jokes/${editedJoke.id}`,
      {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(editedJoke),
      }
    );

    console.log("Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to update the joke: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("joke updated:", result);
    return result;
  } catch (error) {
    console.error("Error updating joke:", error);
  }
};

export const deleteJoke = (jokeId) => {
  fetch(`http://localhost:8088/jokes/${jokeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//export const getAllJokes = () => {
//   return fetch(`http://localhost:8088/jokes`).then((res) => res.json());
// };
