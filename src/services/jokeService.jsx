export const postJoke = async (jokeText) => {
  const newJoke = {
    //how do I add an id here? math.random? count++?
    text: jokeText,
    told: false,
  };

  try {
    // post new joke in the database
    const response = await fetch("http://localhost:8088/jokes", {
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
    const result = await response.json();
    console.log("New joke posted:", result);
    return result;
  } catch (error) {
    console.error("Error posting joke:", error);
  }
};
