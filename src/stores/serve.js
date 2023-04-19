import axios from "axios";
const fetchIndiaTimeline = async () => {
  const options = {
    method: "GET",
    url: "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india_timeline",
    headers: {
      "X-RapidAPI-Key": "65102f584dmsh955acf385dbb59bp141bc1jsn4c708dc4b706",
      "X-RapidAPI-Host": "corona-virus-world-and-india-data.p.rapidapi.com",
    },
  };
  // eslint-disable-next-line
  const response = await axios(options);
  return response;
};

const fetchCorona = async () => {
  const options = {
    method: "GET",
    url: "https://corona-virus-world-and-india-data.p.rapidapi.com/api",
    headers: {
      "X-RapidAPI-Key": "65102f584dmsh955acf385dbb59bp141bc1jsn4c708dc4b706",
      "X-RapidAPI-Host": "corona-virus-world-and-india-data.p.rapidapi.com",
    },
  };

  // eslint-disable-next-line
  const response = await axios(options);
  return response;
};
const fetchFlag = async () => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/countries",
    headers: {
      "X-RapidAPI-Key": "65102f584dmsh955acf385dbb59bp141bc1jsn4c708dc4b706",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
  // eslint-disable-next-line
  const response = await axios(options);
  return response;
};
export { fetchCorona, fetchIndiaTimeline, fetchFlag };
