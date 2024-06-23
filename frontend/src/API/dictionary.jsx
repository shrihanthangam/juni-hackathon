const useDictionaryAPI = async (word) => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      if (!response.ok) {
        console.error("Network response failed.");
        return NaN;
      }
      return response.json();
    })
    .then((data) => {
      // console.log(word, " Data recieved: ", data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return NaN;
    });
};

export default useDictionaryAPI;
