// import axios from "axios";

// Export an object containing methods we'll use for accessing the Wikipedia API

export default {
  searchTerms: function() {
    return fetch(
      "https://randomuser.me/api/?results=2",
     {
      headers:{
        'Content-Type': 'application/json'
      }
    }
).then((res) => res.json());;
  }
};
