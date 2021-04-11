// import axios from "axios";

// Export an object containing methods we'll use for accessing the Wikipedia API

export default {
  searchTerms: async function () {
    const response = await fetch(
      "https://randomuser.me/api/?results=20",
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json();
    return data.results;
  }
};
